import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from '../styles/globalStyles'
import MyPannel from '../components/MyPannel/MyPannel'
import Lnb from '../components/Lnb/Lnb'
import useGetCards from '../hook/useGetCards'
import CardsList from '../components/Card/CardList'
import { Notice } from '../components/Widget/WidgetStyle'
import useGetAuth from '../hook/useGetAuth'

function Mypage() {
  const navigate = useNavigate()
  // const location = useLocation()
  // console.log(location)
  const userName = useSelector((state) => state.auth.userName)
  const [tab, setTab] = useState('목표')
  // 토큰 조회
  const [trouble, setTrouble] = useState('')
  const [tryAuth, setTryAuth] = useState(null)
  const { authLoading, authCheck } = useGetAuth(tryAuth)

  // 카드 조회
  const [categoryId, setCategoryId] = useState((location[0] = 0))
  const [statusId, setStatusId] = useState((location[1] = 0))
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

  const handleTab = (e) => {
    console.log(tab)
    console.log(e.target.value)
    setTab(e.target.value)
  }

  useEffect(() => {
    console.log('auth 로딩 상태 ', authLoading)
    console.log('card 로딩 상태 ', loading)
    console.log('로그인 상태: ', authCheck)
    console.log('card 에러 ', error)
    console.log('trouble shooting :', trouble)

    // 아직 auth 검사가 진행중이라면 스탑
    if (authLoading === true) {
      null
    } else if (authCheck === false) {
      console.log('authcheck: ', authCheck)
      alert('장기간 이용하지 않아 로그아웃 되었습니다')
      navigate('/login')
    } else if ((authLoading === false, authCheck === true, error === false)) {
      setTrouble('')
    }
    // authCheck true 였다가 만료된 경우 -> auth 훅 재실행
    else if (
      authLoading === false &&
      authCheck === true &&
      error === true &&
      trouble === ''
    ) {
      setTrouble('auth 재실행')
      setTryAuth(true)
    } else if (
      authLoading === false &&
      authCheck === true &&
      error === false &&
      trouble === 'auth 재실행'
    ) {
      setTrouble('')
      console.log('재실행한 뒤 카드 불러옴')
    }
  }, [authLoading, error])

  return (
    <Container>
      {authLoading ? (
        <Row>
          <Col>로그인 체크 중...</Col>
        </Row>
      ) : authCheck ? (
        <Row>
          <MyPannel
            tab={tab}
            onClick={handleTab}
            metadata={metadata}
          ></MyPannel>
        </Row>
      ) : (
        <Row>
          <Col>로그인이 필요합니다</Col>
        </Row>
      )}
      {tab === '목표' ? (
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
          <CardsList cards={cards} handleLastCardRef={handleLastCardRef} />
          <Row>
            <Col>
              <Notice>
                <div>{loading && '로딩 중입니다...🐢'}</div>
                <div>
                  {error && '에러가 발생했어요. 다시 시도해 보세요. 🤔 '}
                </div>
                <div>{cards.length === 0 && '아직 목표가 없어요 🙅'}</div>
              </Notice>
            </Col>
          </Row>
        </>
      ) : (
        <Row>여기는 구독 피드</Row>
      )}
    </Container>
  )
}

export default Mypage
