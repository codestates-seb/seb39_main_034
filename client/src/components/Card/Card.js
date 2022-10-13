import { Profile } from '../Widget/WidgetStyle'
import {
  CardContainer,
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
  desc,
  status,
  done,
  todo,
  follow,
  banner,
  profile,
  author,
  final,
}) {
  return (
    <CardContainer>
      <CardWrapper status={status} className="card_front">
        {status === '진행중' ||
          (final === 'waiting' ? (
            <Sticker src="https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol_border.png" />
          ) : final === 'done' ? (
            <Sticker src="https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol_yellow_sticker.png" />
          ) : null)}
        <CardBanner banner={banner}>
          <CategoryBadge>{category}</CategoryBadge>
        </CardBanner>
        <CardBody>
          <div className="card_title">
            <h4>{title}</h4>
          </div>
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
      </CardWrapper>
      <CardWrapper status={status} className="card_back">
        <div className="card_back_content">
          <div className="card_back_logo"></div>
          <div className="card_back_desc">&quot; {desc} &quot;</div>
        </div>
      </CardWrapper>
    </CardContainer>
  )
}

export default Card
