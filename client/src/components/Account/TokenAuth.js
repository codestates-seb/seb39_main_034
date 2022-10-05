import axios from 'axios'
import { SET_LOGIN, SET_LOGOUT } from '../../redux/authSlice'
import {
  setRefreshToken,
  getCookieToken,
  removeCookieToken,
} from '../../data/Cookie'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

export const onRemind = (dispatch) => {
  // localstorage에서 redux로 옮겨와 저장
  dispatch(
    SET_LOGIN({
      userName: window.localStorage.getItem('userName'),
      authorization: window.localStorage.getItem('authorization'),
    })
  )
}

export const onLoginSuccess = (dispatch, access, refresh, userName) => {
  console.log('로그인 성공')
  // token과 이름을 localstorage에 저장
  if (userName) window.localStorage.setItem('userName', userName)
  window.localStorage.setItem('authorization', access)

  // refreshtoken을 쿠키에 저장
  removeCookieToken()
  setRefreshToken(refresh)

  // header에 accessToken 설정
  axios.defaults.headers.common['Authorization'] = access
  // access 유효시간 30분 테스트
  setTimeout(() => {
    console.log('Access 유효시간 1분 만료')
  }, 60 * 1000)
  setTimeout(() => {
    console.log('Refresh 유효시간 3분 만료')
  }, 3 * 60 * 1000)

  //localstorage에 저장한 값을 redux로 받아옴
  onRemind(dispatch)
}

export const onLogout = (dispatch) => {
  // localstorage에서 accessToken 삭제
  window.localStorage.removeItem('userName')
  window.localStorage.removeItem('authorization')

  // redux에서 accessToken 삭제
  dispatch(SET_LOGOUT())

  // cookie에서 refreshToken 삭제
  removeCookieToken()

  // header에서 accessToken 삭제
  axios.defaults.headers.common['Authorization'] = null
}

export const onRefresh = (dispatch) => {
  const refresh_token = getCookieToken()

  // cookie에 refreshToken이 남아있다면 refresh 시도
  if (refresh_token) {
    console.log('Refresh 시도')
    axios({
      method: 'get',
      url: '/v1/users/validation',
      headers: { Refresh: refresh_token },
    })
      .then((res) => {
        console.log(res)
        if (res.data.token_status === 'RE_ISSUED') {
          console.log('Refresh 성공')
          console.log(res.headers.new_refresh)
          onLoginSuccess(
            dispatch,
            res.headers.new_authorization,
            res.headers.new_refresh
          )
        } else if (
          res.data.token_status === 'NOT_VALID_TOKEN' ||
          res.data.token_status === 'REFRESH_NOT_VALID_TOKEN'
        ) {
          onLogout(dispatch)
          alert('토큰이 만료되어 로그아웃 됩니다')
        }
      })
      .catch((err) => {
        console.log(err)
        onLogout(dispatch)
        alert('토큰이 만료되어 로그아웃 됩니다')
      })
  }
}

export const onAccessTest = (dispatch) => {
  axios({
    method: 'get',
    url: 'v1/authenticationTest',
  })
    .then((res) => {
      console.log(res)
      if (res.data.auth === 'Okay') {
        console.log('Access 인증 통과')
      }
    })
    .catch((err) => {
      console.log('Access 인증 실패')
      console.log(err)
      onRefresh(dispatch)
    })
}

export const handleAuthErr = (dispatch, navigate, err, func) => {
  // 에러객체와 원래 시도했던 기능을 받아서
  // 로그인 여부 확인하고 3초 뒤 재실행
  console.log(err.response)
  try {
    if (
      err.response.data.message === 'NOT_VALID_TOKEN' ||
      err.response.data.message === 'ACCESS_NOT_VALID_TOKEN'
    ) {
      setTimeout(func, 1800)
      // alert('로그인 정보를 재확인합니다. 잠시 기다려주세요.')
      onRefresh(dispatch)
    } else if (
      err.response.data.message === 'Login_Required' ||
      err.response.data.message === 'REFRESH_NOT_VALID_TOKEN'
    ) {
      console.log('디테일뷰에서 refresh 실패', err)
      onLogout(dispatch)
      alert('로그인 토큰이 만료되어 로그아웃 됩니다')
      navigate('/login')
    }
  } catch (err) {
    console.log('디테일뷰에서 최종 에러', err)
    alert('로그인 토큰이 만료되어 로그아웃 됩니다')
    navigate('/login')
  }
}

// // accessToken 만료하기 1분 전에 로그인 연장
// // const access_max_age = 24 * 3600 * 1000
// // setTimeout(onSilentRefresh, access_max_age - 60000)
// export const onSilentRefresh = () => {
//   const refresh_token = getCookieToken()

//   // cookie에 refreshToken이 남아있다면 silent refresh 시도
//   if (refresh_token) {
//     axios
//       .post('/silent-refresh', refresh_token)
//       .then((res) => onLoginSuccess(res))
//       .catch((err) => {
//         console.log(err)
//         onLogout()
//       })
//   }
// }
