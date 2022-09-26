import axios from 'axios'
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_LOGOUT } from '../../redux/authSlice'
import {
  setRefreshToken,
  getCookieToken,
  removeCookieToken,
} from '../../data/Cookie'

const refresh_token = getCookieToken()
const access_max_age = 24 * 3600 * 1000

export const onLoginSuccess = (res) => {
  const dispatch = useDispatch()
  dispatch(
    SET_LOGIN({
      userName: res.username,
      accessToken: res.data,
    })
  )
  setRefreshToken(res.json.refresh_token)

  // accessToken 설정
  axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`

  // accessToken 만료하기 1분 전에 로그인 연장
  setTimeout(onSilentRefresh, access_max_age - 60000)
}

export const onLogout = () => {
  const dispatch = useDispatch()
  dispatch(SET_LOGOUT())
  removeCookieToken()
}

export const onSilentRefresh = () => {
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
