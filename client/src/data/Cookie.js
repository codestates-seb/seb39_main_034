import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setRefreshToken = (refresh_token) => {
  // const today = new Date()
  // const refresh_expire_date = today.setDate(today.getDate() + 7)

  return cookies.set('refresh_token', refresh_token, {
    sameSite: 'strict',
    path: '/',
    HttpOnly: true,
    // expires: new Date(refresh_expire_date),
  })
}

export const getCookieToken = () => {
  return cookies.get('refresh_token')
}

export const removeCookieToken = () => {
  return cookies.remove('refresh_token', {
    sameSite: 'strict',
    path: '/',
    HttpOnly: true,
  })
}
