import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
// import { getCookieToken } from '../data/Cookie'
// import { onLoginSuccess, onLogout } from '../components/Account/TokenAuth'
import { handleAuthErr } from '../components/Account/TokenAuth'
import { useNavigate } from 'react-router-dom'

const useGetAuth = (authErr, setAuthErr) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [authCheck, setAuthCheck] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const controller = new AbortController()
  const fetchData = async () => {
    console.log('페이지 입장 시 토큰 검증 요청 시작')
    if (authLoading === false) {
      setAuthLoading(true)
    }
    try {
      const accessCheck = await axios({
        method: 'get',
        url: 'v1/authenticationTest',
        signal: controller.signal,
      })
      console.log(accessCheck)
      if (accessCheck.data.auth === 'Okay') {
        console.log('Access 인증 통과')
        setAuthCheck(true)
      }
    } catch (err) {
      handleAuthErr(dispatch, navigate, err, () => setAuthErr(null))
    } finally {
      setAuthLoading(false)
      console.log('페이지 입장 시 토큰검사 로딩상태 종료')
    }
  }

  useEffect(() => {
    fetchData()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (authErr !== null) {
      console.log('2. 카드 훅으로부터 err 넘겨받음', authErr)
      setAuthLoading(true)
      handleAuthErr(dispatch, navigate, authErr, () => setAuthErr(null))
    } else {
      console.log('8. authErr 해제')
      setAuthLoading(false)
    }
  }, [authErr])

  return { authLoading, authCheck }
}

// const useGetAuth = (tryAuth) => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [authCheck, setAuthCheck] = useState(null)
//   const [authLoading, setAuthLoading] = useState(true)

//   useEffect(() => {
//     console.log('tryAuth 변수: ', tryAuth)
//     const controller = new AbortController()
//     const fetchData = async () => {
//       console.log('토큰 검증 요청 시작')
//       if (authLoading === false) {
//         setAuthLoading(true)
//       }
//       try {
//         const accessCheck = await axios({
//           method: 'get',
//           url: 'v1/authenticationTest',
//           signal: controller.signal,
//         })
//         console.log(accessCheck)
//         if (accessCheck.data.auth === 'Okay') {
//           console.log('Access 인증 통과')
//           setAuthCheck(true)
//         }
//       } catch (err) {
//         handleAuthErr(dispatch, navigate, err, fetchData)
//         // console.log(err.message)
//         // console.log('refresh 시도')
//         // const refresh_token = getCookieToken()
//         // const refreshCheck = await axios({
//         //   method: 'get',
//         //   url: '/v1/users/validation',
//         //   headers: { Refresh: refresh_token },
//         // })
//         // if (refreshCheck.data.token_status === 'RE_ISSUED') {
//         //   console.log('Refresh 성공')
//         //   onLoginSuccess(
//         //     dispatch,
//         //     refreshCheck.headers.new_authorization,
//         //     refreshCheck.headers.new_refresh
//         //   )
//         //   setAuthCheck(true)
//         //   console.log('authcheck를 true로 변경')
//         // } else {
//         //   onLogout(dispatch)
//         //   setAuthCheck(false)
//         // }
//       } finally {
//         setAuthLoading(false)
//         console.log('토큰검사 로딩상태 종료')
//       }
//     }

//     if (tryAuth !== false) fetchData()

//     //useeffect cleanup function
//     return () => controller.abort()
//     //eslint-diable-next-line
//   }, [tryAuth])

//   return { authLoading, authCheck }
// }

export default useGetAuth

//rYM0, CCUL0
