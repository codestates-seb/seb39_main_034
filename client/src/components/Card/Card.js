import { Profile } from '../Widget/WidgetStyle'
import {
  CardBanner,
  CardBody,
  CardFooter,
  CardWrapper,
  CategoryBadge,
  StatusBadge,
  Sticker,
} from './CardStyle'

function Card({
  category,
  title,
  status,
  done,
  todo,
  follow,
  banner,
  profile,
  author,
}) {
  return (
    <>
      <CardWrapper status={status}>
        <CardBanner banner={banner}>
          <CategoryBadge>{category}</CategoryBadge>
        </CardBanner>
        <CardBody>
          <h4>{title}</h4>
          <div className="item">
            <span className="item-title">진행</span>
            <span className="item-text">
              <StatusBadge className="item-text" status={status}></StatusBadge>
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
          <Profile image={profile} author={author}></Profile>
        </CardFooter>
        <Sticker></Sticker>
      </CardWrapper>
    </>
  )
}

export default Card
