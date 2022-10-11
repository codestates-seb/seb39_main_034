import { Cookies } from 'react-cookie'

const cookies = new Cookies()
const refresh_max_age = 420 * 60

export const setRefreshToken = (refresh_token) => {
  console.log('6. 쿠키에 토큰 저장:', refresh_token)
  console.log('쿠키 저장시각:', new Date())
  return cookies.set('refresh_token', refresh_token, {
    sameSite: 'strict',
    path: '/',
    // // document.cooke로 접근 방지
    // HttpOnly: true,
    // https인 통신에서만 서버에 전송
    secure: true,
    // 420분 뒤 삭제
    maxAge: refresh_max_age,
  })
}

export const getCookieToken = () => {
  return cookies.get('refresh_token')
}

export const removeCookieToken = () => {
  return cookies.remove('refresh_token', {
    sameSite: 'strict',
    path: '/',
    secure: true,
    maxAge: refresh_max_age,
  })
}
