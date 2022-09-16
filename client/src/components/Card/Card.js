import { CategoryTag, StatusTag } from './CardStyle'

function Card() {
  return (
    <>
      <CategoryTag>운동</CategoryTag>
      <CategoryTag>생활습관</CategoryTag>
      <CategoryTag>독서</CategoryTag>
      <CategoryTag>공부</CategoryTag>
      <StatusTag status="pending"></StatusTag>
      <StatusTag status="success"></StatusTag>
      <StatusTag status="fail"></StatusTag>
    </>
  )
}

export default Card
