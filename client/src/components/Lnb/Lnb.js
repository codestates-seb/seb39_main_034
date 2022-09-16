import { CategoryBtn, StatusBtn, CreateBtn } from './LnbStyles'
import { CategoryList } from '../../data/LnbData'

function Lnb() {
  return (
    <>
      <CategoryBtn>전체보기</CategoryBtn>
      {CategoryList.map((category, idx) => (
        <CategoryBtn key={idx}>{category}</CategoryBtn>
      ))}
      <StatusBtn status="pending" />
      <StatusBtn status="success" />
      <StatusBtn status="fail" />
      <CreateBtn />
    </>
  )
}

export default Lnb
