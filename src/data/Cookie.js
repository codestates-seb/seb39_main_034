import { Cookies } from 'react-cookie'

const cookies = new Cookies()
const refresh_max_age = 4 * 60 * 60

export const setRefreshToken = (refresh_token) => {
  console.log('쿠키 세팅하기 시도')
  return cookies.set('refresh_token', refresh_token, {
    sameSite: 'strict',
    path: '/',
    // // document.cooke로 접근 방지
    // HttpOnly: true,
    // https인 통신에서만 서버에 전송
    secure: true,
    // 240분 뒤 삭제
    maxAge: refresh_max_age,
  })
}

export const getCookieToken = () => {
  console.log('기존 refreshtoken: ')
  return cookies.get('refresh_token')
}

export const removeCookieToken = () => {
  return cookies.remove('refresh_token', {
    sameSite: 'strict',
    path: '/',
    // HttpOnly: true,
    secure: true,
    maxAge: refresh_max_age,
  })
}
