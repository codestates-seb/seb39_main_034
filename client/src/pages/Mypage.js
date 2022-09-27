import { Container, Row, Col } from '../styles/globalStyles'
import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useGetCards from '../hook/useGetCards'
import { Notice } from '../components/Widget/WidgetStyle'

import MyLnb from '../components/Lnb/MyLnb'
import Card from '../components/Card/Card'

function Mypage() {
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

  return (
    <Container>
      <Row>
        여기는 마이페이지
        <MyLnb
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          setStatusId={setStatusId}
          statusId={statusId}
          setPageNumber={setPageNumber}
        />
      </Row>
      <Row>
        {cards.map((card, idx) => {
          // console.log('카드 목록 렌더')
          if (cards.length === idx + 1) {
            return (
              <Col
                lg={4}
                md={6}
                sm={4}
                ref={handleLastCardRef}
                key={card.goadId}
                anchor={'100%'}
              >
                <Link to={`/goal/detail/${card.goalId}`}>
                  <Card
                    category={card.category}
                    title={card.title}
                    status={
                      card.status === '진행중' ? card.status : card.result
                    }
                    done={card.numberOfCompletedTodos}
                    todo={card.numberOfFollowers}
                    follow={card.numberOfFollowers}
                    banner="https://www.telegraph.co.uk/content/dam/health-fitness/2018/08/31/TELEMMGLPICT000156474637_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=680"
                    image={
                      'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    }
                    author={'조안나'}
                  />
                </Link>
              </Col>
            )
          } else {
            return (
              <Col lg={4} md={6} sm={4} key={card.goadId} anchor={'100%'}>
                <Link to={`/goal/detail/${card.goalId}`}>
                  <Card
                    category={card.category}
                    title={card.title}
                    status={
                      card.status === '진행중' ? card.status : card.result
                    }
                    done={card.numberOfCompletedTodos}
                    todo={card.numberOfFollowers}
                    follow={card.numberOfFollowers}
                    banner="https://www.telegraph.co.uk/content/dam/health-fitness/2018/08/31/TELEMMGLPICT000156474637_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=680"
                    image={
                      'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    }
                    author={'조안나'}
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
            <div>{error && '에러가 발생했어요 🤔 '}</div>
            <div>{cards.length === 0 && '검색 결과가 없어요 🙅'}</div>
          </Notice>
        </Col>
      </Row>
    </Container>
  )
}

export default Mypage