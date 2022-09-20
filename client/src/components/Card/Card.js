import {
  CardBanner,
  CardBody,
  CardFooter,
  CardWrapper,
  CategoryTag,
  StatusTag,
} from './CardStyle'

function Card({ category, title, status }) {
  return (
    <>
      <CardWrapper>
        <CardBanner>
          <CategoryTag>{category}</CategoryTag>
        </CardBanner>
        <CardBody>
          <h4>{title}</h4>
          <div>
            <span className="item">진행</span>
            <StatusTag className="text" status={status}></StatusTag>
          </div>
          <div>
            <span className="item">할일</span>
            <span className="text">2/5개의 할일</span>
          </div>
          <div>
            <span className="item">구독</span>
            <span className="text">10명이 구독하고 있어요</span>
          </div>
        </CardBody>
        <CardFooter>조안나</CardFooter>
      </CardWrapper>
    </>
  )
}

export default Card
