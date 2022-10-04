import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from '../styles/globalStyles'
import MyPannel from '../components/MyPannel/MyPannel'
import Lnb from '../components/Lnb/Lnb'
import axios from 'axios'
import useGetCards from '../hook/useGetCards'
import CardsList from '../components/Card/CardList'
import useGetAuth from '../hook/useGetAuth'
// 타임라인 관련
import Feedlist from '../components/MyPannel/Feedlist'
import FeedModal from '../components/MyPannel/FeedModal'
import { MoreBtn, Notice } from '../components/Widget/WidgetStyle'

function Mypage() {
  const navigate = useNavigate()
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
  //피드 조회
  const [isOpen, setIsOpen] = useState(false)
  const [feedData, setFeedData] = useState([{ timeline: { image: {} } }])
  console.log(isOpen)

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

  // lnb 탭 클릭
  const handleTab = (e) => {
    setTab(e.target.value)
  }

  // 피드 관련
  const openTimelineModal = () => {
    setIsOpen(!isOpen)
    document.body.style.overflow = 'hidden'
  }

  useEffect(() => {
    // console.log('auth 로딩 상태 ', authLoading)
    // console.log('card 로딩 상태 ', loading)
    // console.log('로그인 상태: ', authCheck)
    // console.log('card 에러 ', error)
    // console.log('trouble shooting :', trouble)

    // 아직 auth 검사가 진행중이라면 스탑
    if (authLoading === true) {
      null
    } else if (authCheck === false) {
      console.log('authcheck: ', authCheck)
      alert('장기간 이용하지 않아 로그아웃 되었습니다')
      navigate('/login')
    } else if ((authCheck === true, error === false)) {
      setTrouble('')
    }
    // authCheck true 였다가 만료된 경우 -> auth 훅 재실행
    else if (authCheck === true && error === true && trouble === '') {
      setTrouble('auth 재실행')
      setTryAuth(true)
    } else if (
      authCheck === true &&
      error === false &&
      trouble === 'auth 재실행'
    ) {
      setTrouble('')
      console.log('재실행한 뒤 카드 불러옴')
    }
  }, [authLoading, error])

  //임시로 30번 게시글 데이터 조회
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

  return (
    <>
      <Container>
        {/*상단 패널*/}
        {authLoading ? (
          <Row>
            <Col>
              <Notice>
                <div>로그인 체크 중...</div>
              </Notice>
            </Col>
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
            <Col>
              <Notice>
                <div>로그인이 필요합니다</div>
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
                    {error && '에러가 발생했어요. 다시 시도해 보세요. 🤔 '}
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
                <div>로그인이 필요합니다</div>
              </Notice>
            </Col>
          </Row>
        )}
      </Container>
      {isOpen && <FeedModal feedData={feedData} setIsOpen={setIsOpen} />}
    </>
  )
}

export default Mypage
