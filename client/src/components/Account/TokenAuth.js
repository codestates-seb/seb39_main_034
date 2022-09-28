import axios from 'axios'
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_LOGOUT } from '../../redux/authSlice'
import {
  setRefreshToken,
  getCookieToken,
  removeCookieToken,
} from '../../data/Cookie'

export const onLoginSuccess = (userName, headers) => {
  // token과 이름을 localstorage에 저장
  window.localStorage.setItem('userName', userName)
  window.localStorage.setItem('authorization', headers.authorization)

  //localstorage에 저장한 값을 redux로 받아옴
  onRemind()

  // refreshtoken을 쿠키에 저장
  setRefreshToken(headers.refresh)

  // header에 accessToken 설정
  axios.defaults.headers.common['Authorization'] = headers.authorization
}

export const onRemind = () => {
  // localstorage에서 redux로 옮겨와 저장
  const dispatch = useDispatch()
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
