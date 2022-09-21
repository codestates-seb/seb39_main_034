import { Profile } from '../Widget/WidgetStyle'
import {
  CardBanner,
  CardBody,
  CardFooter,
  CardWrapper,
  CategoryTag,
  StatusTag,
} from './CardStyle'

function Card({
  category,
  title,
  status,
  done,
  todo,
  follow,
  banner,
  image,
  author,
}) {
  return (
    <>
      <CardWrapper>
        <CardBanner banner={banner}>
          <CategoryTag>{category}</CategoryTag>
        </CardBanner>
        <CardBody>
          <h4>{title}</h4>
          <div className="item">
            <span className="item-title">진행</span>
            <span className="item-text">
              <StatusTag className="item-text" status={status}></StatusTag>
            </span>
          </div>
          <div className="item">
            <span className="item-title">할일</span>
            <span className="item-text">
              {done}/{todo}개의 할일
            </span>
          </div>
          <div className="item">
            <span className="item-title">구독</span>
            <span className="item-text">{follow}명이 구독하고 있어요</span>
          </div>
        </CardBody>
        <CardFooter>
          <Profile image={image} author={author}></Profile>
        </CardFooter>
      </CardWrapper>
    </>
  )
}

export default Card
