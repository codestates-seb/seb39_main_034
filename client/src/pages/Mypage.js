import { Container, Row, Col } from '../styles/globalStyles'
import { useState, useRef, useCallback } from 'react'
import useGetCards from '../hook/useGetCards'
import { Notice } from '../components/Widget/WidgetStyle'
import Lnb from '../components/Lnb/Lnb'
import CardList from '../components/Card/CardList'
import { onAccessTest } from '../components/Account/TokenAuth'
import { useDispatch } from 'react-redux'

function Mypage() {
  const [categoryId, setCategoryId] = useState(0)
  const [statusId, setStatusId] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const { loading, error, cards, hasMore } = useGetCards(
    categoryId,
    statusId,
    pageNumber
  )

  const dispatch = useDispatch()
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

  onAccessTest(dispatch)

  return (
    <Container>
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
            <div>{cards.length === 0 && '검색 결과가 없어요 🙅'}</div>
          </Notice>
        </Col>
      </Row>
    </Container>
  )
}

export default Mypage
