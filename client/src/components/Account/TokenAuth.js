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

  //localstorage에 저장한 값을 redux로 받아옴
  onRemind(dispatch)

  // header에 accessToken 설정
  axios.defaults.headers.common['Authorization'] = access
  // access 유효시간 30분 테스트
  console.log('Access : ', access)
  setTimeout(() => {
    console.log('Access 유효시간 1분 만료')
  }, 60 * 1000)
  setTimeout(() => {
    console.log('Refresh 유효시간 3분 만료')
  }, 3 * 60 * 1000)
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
          onLoginSuccess(
            dispatch,
            res.headers.new_authorization,
            res.headers.new_refresh
          )
        }
      })
      .catch((err) => {
        console.log(err)
        onLogout(dispatch)
        alert('계정에 오류가 발생해 로그아웃 됩니다')
        // navigate('/')
      })
  }
}

export const onAccessTest = async (dispatch) => {
  await axios({
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
