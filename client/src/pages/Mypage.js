import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from '../styles/globalStyles'
import MyPannel from '../components/MyPannel/MyPannel'
import Lnb from '../components/Lnb/Lnb'
import useGetCards from '../hook/useGetCards'
import CardList from '../components/Card/CardList'
import { Notice } from '../components/Widget/WidgetStyle'
import useGetAuth from '../hook/useGetAuth'

function Mypage() {
  const navigate = useNavigate()
  //인증 관련
  const { authLoading, authCheck } = useGetAuth()
  const userName = useSelector((state) => state.auth.userName)
  //필터링 관련
  const [categoryId, setCategoryId] = useState(0)
  const [statusId, setStatusId] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const { loading, error, cards, metadata, hasMore } = useGetCards(
    categoryId,
    statusId,
    pageNumber,
    userName,
    authLoading
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

  useEffect(() => {
    console.log('authcheck: ', authCheck)
    if (authCheck === false) {
      alert('로그인이 필요합니다')
      navigate('/login')
    }
  }, [authCheck])

  return (
    <Container>
      {authLoading ? (
        <Row>
          <Col>로그인 체크 중...</Col>
        </Row>
      ) : authCheck ? (
        <>
          <Row>
            <MyPannel metadata={metadata}></MyPannel>
          </Row>
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
          <Col>로그인이 필요합니다</Col>
        </Row>
      )}
    </Container>
  )
}

export default Mypage
