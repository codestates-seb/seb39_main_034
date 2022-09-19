import { useState, useRef, useCallback } from 'react'
import { Container, Row, Col } from '../styles/globalStyles'
import useGetCards from '../hook/useGetCards'
import { Link } from 'react-router-dom'
import Lnb from '../components/Lnb/Lnb'
import Card from '../components/Card/Card'
// import { cardData } from '../data/CardData'

function Main() {
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
          console.log('crossed!')
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (target) observer.current.observe(target)
    },
    [loading, hasMore]
  )

  console.log('현재 불러온 카드 목록 : ', cards)

  return (
    <Container>
      <Row>
        <Col>
          <Lnb setCategoryQuery={setCategoryQuery} />
        </Col>
      </Row>
      <Row>
        {cards.map((card, idx) => {
          if (cards.length === idx + 1) {
            return (
              <Col lg={4} sm={4} ref={handleLastCardRef} key={card.key}>
                <Link to={`/detail`}>
                  <Card
                    category={card.type}
                    title={card.title}
                    status="pending"
                  />
                </Link>
              </Col>
            )
          } else {
            return (
              <Col lg={4} sm={4} key={card.key}>
                <Link to={`/detail`}>
                  <Card
                    category={card.type}
                    title={card.title}
                    status="pending"
                  />
                </Link>
              </Col>
            )
          }
        })}
        {/* {cardData.map((data) => (
          <Col lg={4} sm={4} key={data.id}>
            <Link to={`/detail`}>
              <Card category="생활습관" title={data.title} status="pending" />
            </Link>
          </Col>
        ))} */}
        <div>
          <h2>{loading && 'loading...'}</h2>
        </div>
        <div>{error && 'error...'}</div>
      </Row>
    </Container>
  )
}

export default Main
