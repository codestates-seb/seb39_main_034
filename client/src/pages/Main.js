import { useState, useRef, useCallback } from 'react'
import { Container, Row, Col } from '../styles/globalStyles'
import useGetCards from '../hook/useGetCards'
import { Link } from 'react-router-dom'
import Lnb from '../components/Lnb/Lnb'
import Card from '../components/Card/Card'
import { Notice } from '../components/Widget/WidgetStyle'

function Main() {
  // console.log('메인뷰 실행될 때 찍은 로그')
  const [categoryQuery, setCategoryQuery] = useState('all')
  const [pageNumber, setPageNumber] = useState(1)
  const { loading, error, cards, hasMore } = useGetCards(
    categoryQuery,
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

  return (
    <Container>
      <Row>
        <Col>
          <Lnb setCategoryQuery={setCategoryQuery} />
        </Col>
      </Row>
      <Row>
        {cards.map((card, idx) => {
          // console.log('카드 목록 렌더')
          if (cards.length === idx + 1) {
            return (
              <Col lg={4} sm={4} ref={handleLastCardRef} key={card.goadId}>
                <Link to={`/detail`}>
                  <Card
                    category={card.category}
                    title={card.title}
                    status={card.status}
                  />
                </Link>
              </Col>
            )
          } else {
            return (
              <Col lg={4} sm={4} key={card.goadId}>
                <Link to={`/detail`}>
                  <Card
                    category={card.category}
                    title={card.title}
                    status={card.status === '진행완료' ? card.result : 0}
                  />
                </Link>
              </Col>
            )
          }
        })}
      </Row>
      <Row>
        <Col>
          <Notice>
            <div>{loading && '로딩 중입니다...🐢'}</div>
            <div>{error && '에러가 발생했습니다 🤔 '}</div>
          </Notice>
        </Col>
      </Row>
    </Container>
  )
}

export default Main
