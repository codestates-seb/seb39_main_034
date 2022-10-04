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
  type,
  category,
  title,
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
      {type === 'my' ? (
        final === 'waiting' ? (
          <Sticker src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/eb5c1f4e-4d7c-4bf6-9c4f-765287ffa8b1/yellow.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221004T151837Z&X-Amz-Expires=86400&X-Amz-Signature=e49d8dc8830d899c619d62b2becdf8475061d2a9363c957ccb910d5dbdd05618&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22yellow.png%22&x-id=GetObject" />
        ) : final === 'done' ? (
          <Sticker src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/656ee841-d139-4db4-a406-799e7931af4a/purple.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221004T154754Z&X-Amz-Expires=86400&X-Amz-Signature=e6bb1153bd06c2b12dae448a421cb1d65a390f6a8410114a6bbb177323ed1017&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22purple.png%22&x-id=GetObject" />
        ) : null
      ) : null}
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
      </CardWrapper>
    </CardContainer>
  )
}

export default Card
