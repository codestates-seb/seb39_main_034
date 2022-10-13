import { Cookies } from 'react-cookie'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from '../styles/globalStyles'
import MyPannel from '../components/MyPannel/MyPannel'
import Lnb from '../components/Lnb/Lnb'
import axios from 'axios'
import useGetCards from '../hook/useGetCards'
import CardsList from '../components/Card/CardList'
import useGetAuth from '../hook/useGetAuth'
// 타임라인 관련
import Feedlist from '../components/MyPannel/Feedlist'
import { FeedModal, AlertModal } from '../components/MyPannel/FeedModal'
import { MoreBtn, Notice } from '../components/Widget/WidgetStyle'
import Footer from '../components/Footer/Footer'

function Mypage() {
  // const navigate = useNavigate()
  const userName = useSelector((state) => state.auth.userName)
  const [tab, setTab] = useState('목표')
  // 토큰 조회
  // const [tryAuth, setTryAuth] = useState(null)
  const [authErr, setAuthErr] = useState(null)
  const { authLoading, authCheck } = useGetAuth(authErr, setAuthErr)
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
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  // 피드 조회
  const [isFeedOpen, setIsFeedOpen] = useState(false)
  const [feedData, setFeedData] = useState([{ timeline: { image: {} } }])

  console.log(
    '***',
    userName,
    'authcheck: ',
    authCheck,
    'authloading: ',
    authLoading
  )

  // 피드 열기 모달
  const openTimelineModal = () => {
    setIsFeedOpen(!isFeedOpen)
    document.body.style.overflow = 'hidden'
  }

  // 피드 열기 모달
  const openAlertModal = () => {
    setIsAlertOpen(!isFeedOpen)
    document.body.style.overflow = 'hidden'
  }
  // lnb 탭 클릭
  const handleTab = (e) => {
    setTab(e.target.value)
  }

  // 내 목표 카드 받아오기
  const observer = useRef()
  const handleLastCardRef = useCallback(
    (target) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('마지막 요소 교차됨 => 커스텀훅 호출')
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (target) observer.current.observe(target)
    },
    [loading, hasMore]
  )

  // 카드와 토큰 오류 처리
  useEffect(() => {
    //에러 상태가 발생하면 해당 에러를 auth 훅에 넘김
    if (error !== null) {
      console.log('1-3. 에러 객체를 auth훅에 넘김')
      setAuthErr(error)
    }
  }, [error])

  // 피드 정보 받아오기
  useEffect(() => {
    async function getFeed() {
      await axios
        .get(`/v1/members/${userName}/feed`)
        .then((res) => {
          console.log(res.data)
          setFeedData(res.data)
        })
        .catch((err) => {
          console.log('ERROR: ', err)
        })
    }
    if (tab === '피드') {
      getFeed()
    }
  }, [tab])

  useEffect(() => {
    const cookies = new Cookies()
    const closeAlert = cookies.get('closeAlert')
    if (closeAlert !== 'true' && metadata.numberOfWaitingFinalTimeline) {
      openAlertModal()
    }
  }, [metadata])

  return (
    <>
      <Container>
        {/*상단 패널*/}
        {authCheck ? (
          <Row>
            <MyPannel
              tab={tab}
              onClick={handleTab}
              metadata={metadata}
            ></MyPannel>
          </Row>
        ) : (
          <Row>
            <Col>
              <Notice>
                <div>로그인 체크 중...</div>
              </Notice>
            </Col>
          </Row>
        )}
        {/*하단 페이지*/}
        {authCheck && tab === '목표' ? (
          <>
            <Row>
              <Lnb
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                setStatusId={setStatusId}
                statusId={statusId}
                setPageNumber={setPageNumber}
                location={'my'}
              />
            </Row>
            <CardsList
              type={'my'}
              cards={cards}
              handleLastCardRef={handleLastCardRef}
            />
            <Row>
              <Col>
                <Notice>
                  <div>{loading && '로딩 중입니다...🐢'}</div>
                  <div>
                    {error &&
                      '에러가 발생했어요. 잠시 후 다시 시도해 보세요. 🤔 '}
                  </div>
                  <div>{cards.length === 0 && '아직 목표가 없어요 🙅'}</div>
                </Notice>
              </Col>
            </Row>
          </>
        ) : authCheck && tab === '피드' ? (
          <Row>
            <Col>
              <Feedlist
                feedData={feedData}
                status={status}
                mode="limit"
              ></Feedlist>
            </Col>
            {/* 더보기 모달 버튼 */}
            <Col>
              <MoreBtn
                text={'피드 더보기'}
                onClick={openTimelineModal}
              ></MoreBtn>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <Notice>
                {/* <img
                  src="	https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_combination_sm.png"
                  alt="logo"
                ></img> */}
                <div>로그인 체크 중...</div>
              </Notice>
            </Col>
          </Row>
        )}
      </Container>
      {isFeedOpen && (
        <FeedModal feedData={feedData} setIsFeedOpen={setIsFeedOpen} />
      )}
      {isAlertOpen && (
        <AlertModal
          waiting={metadata.numberOfWaitingFinalTimeline}
          setIsAlertOpen={setIsAlertOpen}
        />
      )}
      <Footer />
    </>
  )
}

export default Mypage
