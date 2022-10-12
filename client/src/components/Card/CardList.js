import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from '../../styles/responsive'
import Card from './Card'

const CardsList = React.memo(function CardList({
  cards,
  type,
  handleLastCardRef,
}) {
  console.log('불러온 카드 개수 : ', cards.length)
  return (
    <Row>
      {cards.map((card, idx) => {
        if (cards.length === idx + 1) {
          return (
            <Col
              lg={4}
              md={6}
              sm={4}
              ref={handleLastCardRef}
              key={type + card.goalId.toString()}
              anchor={'100%'}
            >
              <Link to={`/goal/detail/${card.goalId}`}>
                <Card
                  type={type}
                  category={card.category}
                  title={card.title}
                  status={card.status === '진행중' ? card.status : card.result}
                  done={card.numberOfCompletedTodos}
                  todo={card.numberOfTodos}
                  follow={card.numberOfFollowers}
                  // banner={
                  //   card.imageURL ||
                  //   'https://www.telegraph.co.uk/content/dam/health-fitness/2018/08/31/TELEMMGLPICT000156474637_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=680'
                  // }
                  banner={
                    card.imageURL
                      ? card.imageURL
                      : card.category === '운동'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/workout.jpg'
                      : card.category === '생활습관'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/breakfast_in_bed.jpg'
                      : card.category === '독서'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study.jpeg'
                      : card.category === '공부'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study2.jpg'
                      : null
                  }
                  author={card.member}
                  profile={
                    card.member === 'joanna'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member2.jpeg'
                      : card.member === 'sol-namoo'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member1.jpg'
                      : card.member === 'jaeyoungkim'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member3.png'
                      : card.member === 'AhnHyungJoon'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member4.png'
                      : 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png'
                  }
                  final={card.finalTimelineStatus}
                />
              </Link>
            </Col>
          )
        } else {
          return (
            <Col
              lg={4}
              md={6}
              sm={4}
              key={card.goalId.toString()}
              anchor={'100%'}
            >
              <Link to={`/goal/detail/${card.goalId}`}>
                <Card
                  type={type}
                  category={card.category}
                  title={card.title}
                  desc={card.description}
                  status={card.status === '진행중' ? card.status : card.result}
                  done={card.numberOfCompletedTodos}
                  todo={card.numberOfTodos}
                  follow={card.numberOfFollowers}
                  // banner={
                  //   card.imageURL ||
                  //   'https://www.telegraph.co.uk/content/dam/health-fitness/2018/08/31/TELEMMGLPICT000156474637_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=680'
                  // }
                  banner={
                    card.imageURL
                      ? card.imageURL
                      : card.category === '운동'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/workout.jpg'
                      : card.category === '생활습관'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/breakfast_in_bed.jpg'
                      : card.category === '독서'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study.jpeg'
                      : card.category === '공부'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study2.jpg'
                      : null
                  }
                  profile={
                    card.member === 'joanna'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member2.jpeg'
                      : card.member === 'sol-namoo'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member1.jpg'
                      : card.member === 'jaeyoungkim'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member3.png'
                      : card.member === 'AhnHyungJoon'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member4.png'
                      : 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png'
                  }
                  author={card.member}
                  final={card.finalTimelineStatus}
                />
              </Link>
            </Col>
          )
        }
      })}
    </Row>
  )
})

export default CardsList
