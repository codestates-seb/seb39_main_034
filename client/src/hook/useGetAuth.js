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
        url: '/v1/authenticationTest',
        signal: controller.signal,
      })
      console.log(accessCheck)
      if (accessCheck.data.auth === 'Okay') {
        console.log('Access 인증 통과')
        setAuthCheck(true)
        setAuthLoading(false)
        // navigate(0)
        console.log('페이지 입장 시 토큰검사 로딩상태 종료')
      }
    } catch (err) {
      handleAuthErr(dispatch, navigate, err, () => {
        setAuthCheck(true)
        setAuthLoading(false)
        // navigate(0)
        console.log('페이지 입장 시 토큰검사 로딩상태 종료')
      })
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
      handleAuthErr(dispatch, navigate, authErr, () => {
        setAuthErr(null)
        setAuthCheck(true)
        setAuthLoading(false)
      })
    }
  }, [authErr])

  return { authLoading, authCheck }
}

export default useGetAuth
