import { CardWrapper, CategoryTag, StatusTag } from './CardStyle'

function Card({ category, title, status }) {
  return (
    <>
      <CardWrapper>
        <CategoryTag>{category}</CategoryTag>
        <h4>{title}</h4>
        <StatusTag status={status}></StatusTag>
      </CardWrapper>
    </>
  )
}

export default Card
