import { CategoryBtn, StatusBtn, CreateBtn } from './LnbStyles'
import { Link } from 'react-router-dom'

function Lnb() {
  return (
    <>
      <CategoryBtn>전체보기</CategoryBtn>
      <CategoryBtn>운동</CategoryBtn>
      <CategoryBtn>생활습관</CategoryBtn>
      <CategoryBtn>독서</CategoryBtn>
      <CategoryBtn>공부</CategoryBtn>
      <StatusBtn status="pending" />
      <StatusBtn status="success" />
      <StatusBtn status="fail" />
      <Link to="/create">
        <CreateBtn />
      </Link>
    </>
  )
}

export default Lnb
