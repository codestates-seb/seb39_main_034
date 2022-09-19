import { CardWrapper, CategoryTag, StatusTag } from './CardStyle'

function Card() {
  return (
    <>
      <CardWrapper>
        <CategoryTag>생활습관</CategoryTag>
        <StatusTag status="pending"></StatusTag>
      </CardWrapper>
    </>
  )
}

export default Card
