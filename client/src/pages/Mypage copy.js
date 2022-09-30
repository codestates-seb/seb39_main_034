import { useState, useRef, useCallback, useEffect } from 'react'
import { Container, Row, Col } from '../styles/globalStyles'
import MyPannel from '../components/MyPannel/MyPannel'
import Lnb from '../components/Lnb/Lnb'
import useGetCards from '../hook/useGetCards'
import CardList from '../components/Card/CardList'
import { Notice } from '../components/Widget/WidgetStyle'
// import { onAccessTest } from '../components/Account/TokenAuth'
// import useGetAuth from '../hook/useGetAuth'
// import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { getCookieToken } from '../data/Cookie'
import { onLoginSuccess, onLogout } from '../components/Account/TokenAuth'
import axios from 'axios'

function Mypage() {
  //로그인 인증 관련
  const [authCheck, setAuthCheck] = useState(false)
  const [accessCheck, setAccessCheck] = useState(null)
  const dispatch = useDispatch()
  //필터링 관련
  const [categoryId, setCategoryId] = useState(0)
  const [statusId, setStatusId] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const { loading, error, cards, hasMore } = useGetCards(
    categoryId,
    statusId,
    pageNumber
  )

  const observer = useRef()
  const handleLastCardRef = useCallback(
    (target) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // console.log('마지막 요소 교차됨 => 커스텀훅 호출')
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (target) observer.current.observe(target)
    },
    [loading, hasMore]
  )

  console.log(authCheck, accessCheck)

  useEffect(() => {
    // onAccessTest 내용
    const onAccessTest = async () => {
      await axios({
        method: 'get',
        url: 'v1/authenticationTest',
      })
        .then((res) => {
          if (res.data.auth === 'Okay') {
            console.log('Access 인증 통과')
            setAccessCheck(true)
          }
        })
        .catch((err) => {
          console.log('Access 인증 실패')
          console.log(err)
          setAccessCheck(false)
        })
    }
    const onRefresh = async (dispatch) => {
      console.log('Access 만료, Refresh 시도')
      const refresh_token = getCookieToken()
      return await axios({
        method: 'get',
        url: '/v1/users/validation',
        headers: { Refresh: refresh_token },
      })
        .then((res) => {
          console.log(res)
          if (res.data.token_status === 'RE_ISSUED') {
            console.log('Refresh 성공')
            return onLoginSuccess(
              dispatch,
              res.headers.new_authorization,
              res.headers.new_refresh
            )
          }
        })
        .catch((err) => {
          console.log(err)
          alert('계정에 오류가 발생해 로그아웃 됩니다')
          return onLogout(dispatch)
        })
    }
    if (accessCheck === null) {
      onAccessTest()
      console.log('firstcheck: ', onAccessTest())
    }
    if (accessCheck === true) {
      return setAuthCheck(true)
    } else if (accessCheck === false) {
      const secondCheck = onRefresh(dispatch)
      console.log(secondCheck)
      return setAuthCheck(secondCheck)
    }
  }, [accessCheck])

  return (
    <Container>
      <Row>
        <MyPannel></MyPannel>
      </Row>
      {authCheck ? (
        <>
          <Row>
            <Lnb
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              setStatusId={setStatusId}
              statusId={statusId}
              setPageNumber={setPageNumber}
            />
          </Row>
          <CardList cards={cards} handleLastCardRef={handleLastCardRef} />
          <Row>
            <Col>
              <Notice>
                <div>{loading && '로딩 중입니다...🐢'}</div>
                <div>{error && '에러가 발생했어요 🤔 '}</div>
                <div>{cards.length === 0 && '아직 목표가 없어요 🙅'}</div>
              </Notice>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col>아직 로그인 체크 중</Col>
        </Row>
      )}
    </Container>
  )
}

export default Mypage
