import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getCookieToken } from '../data/Cookie'
import { onLoginSuccess, onLogout } from '../components/Account/TokenAuth'

const useGetAuth = () => {
  const [authCheck, setAuthCheck] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
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
        console.log(err.message)
        //refresh 시도
        const refresh_token = getCookieToken()
        const refreshCheck = await axios({
          method: 'get',
          url: '/v1/users/validation',
          headers: { Refresh: refresh_token },
        })
        if (refreshCheck.data.token_status === 'RE_ISSUED') {
          console.log('Refresh 성공')
          onLoginSuccess(
            dispatch,
            refreshCheck.headers.new_authorization,
            refreshCheck.headers.new_refresh
          )
          setAuthCheck(true)
        } else {
          onLogout(dispatch)
          setAuthCheck(false)
        }
      } finally {
        setAuthLoading(false)
      }
    }
    fetchData()

    //useeffect cleanup function
    return () => controller.abort()
    //eslint-diable-next-line
  }, [])

  return { authLoading, authCheck }
}

export default useGetAuth
