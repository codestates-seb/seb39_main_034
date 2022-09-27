import axios from 'axios'
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_LOGOUT } from '../../redux/authSlice'
import {
  setRefreshToken,
  getCookieToken,
  removeCookieToken,
} from '../../data/Cookie'

const access_max_age = 24 * 3600 * 1000

export const onLoginSuccess = (res) => {
  const dispatch = useDispatch()

  // token 세팅
  dispatch(
    SET_LOGIN({
      userName: res.username,
      accessToken: res.data,
    })
  )
  setRefreshToken(res.json.refresh_token)

  // header에 accessToken 설정
  axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`

  // accessToken 만료하기 1분 전에 로그인 연장
  setTimeout(onSilentRefresh, access_max_age - 60000)
}

export const onLogout = () => {
  const dispatch = useDispatch()

  // redux에서 accessToken 삭제
  dispatch(SET_LOGOUT())

  // cookie에서 refreshToken 삭제
  removeCookieToken()

  // header에서 accessToken 삭제
  axios.defaults.headers.common['Authorization'] = null
}

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
