import axios from 'axios'
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_LOGOUT } from '../../redux/authSlice'
import {
  setRefreshToken,
  getCookieToken,
  removeCookieToken,
} from '../../data/Cookie'

export const onLoginSuccess = (access, refresh, userName) => {
  // token과 이름을 localstorage에 저장
  if (userName) window.localStorage.setItem('userName', userName)
  window.localStorage.setItem('authorization', access)

  // refreshtoken을 쿠키에 저장
  removeCookieToken()
  setRefreshToken(refresh)

  //localstorage에 저장한 값을 redux로 받아옴
  onRemind()

  // header에 accessToken 설정
  axios.defaults.headers.common['Authorization'] = access
}

export const onRemind = () => {
  const dispatch = useDispatch()
  // localstorage에서 redux로 옮겨와 저장
  dispatch(
    SET_LOGIN({
      userName: window.localStorage.getItem('userName'),
      authorization: window.localStorage.getItem('authorization'),
    })
  )
}

export const onLogout = () => {
  const dispatch = useDispatch()

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

export const onRefresh = () => {
  const refresh_token = getCookieToken()

  // cookie에 refreshToken이 남아있다면 refresh 시도
  if (refresh_token) {
    axios({
      method: 'post',
      url: '/v1/users/validation',
      headers: { Refresh: refresh_token },
    })
      .then((res) => {
        if (res.data.token_status === 'RE_ISSUED') {
          onLoginSuccess(res.headers.new_authorization, res.headers.new_refresh)
        } else {
          onLogout()
        }
      })
      .catch((err) => {
        console.log(err)
        onLogout()
      })
  }
}

// accessToken 만료하기 1분 전에 로그인 연장
// const access_max_age = 24 * 3600 * 1000
// setTimeout(onSilentRefresh, access_max_age - 60000)
export const onSilentRefresh = () => {
  const refresh_token = getCookieToken()

  // cookie에 refreshToken이 남아있다면 silent refresh 시도
  if (refresh_token) {
    axios
      .post('/silent-refresh', refresh_token)
      .then((res) => onLoginSuccess(res))
      .catch((err) => {
        console.log(err)
        onLogout()
      })
  }
}

// gnb에서 테스트할 용도
export const onRefreshTest = () => {
  const refresh_token = getCookieToken()
  console.log('찾아온 쿠키 : ', refresh_token)

  // cookie에 refreshToken이 남아있다면 refresh 시도
  if (refresh_token) {
    axios({
      method: 'get',
      url: '/v1/users/validation',
      headers: { Refresh: refresh_token },
    })
      .then((res) => {
        if (res.data.token_status === 'RE_ISSUED') {
          console.log('새로받은 refreshtoken: ', res.headers.new_refresh)
          onLoginSuccess(res.headers.new_authorization, res.headers.new_refresh)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
