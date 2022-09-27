import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setRefreshToken = (refreshToken) => {
  const today = new Date()
  const refresh_expire_date = today.setDate(today.getDate() + 7)

  return Cookies.set('refresh_token', refreshToken, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(refresh_expire_date),
  })
}

export const getCookieToken = () => {
  return cookies.get('refresh_token')
}

export const removeCookieToken = () => {
  return cookies.remove('refresh_token', {
    sameSite: 'strict',
    path: '/',
  })
}
