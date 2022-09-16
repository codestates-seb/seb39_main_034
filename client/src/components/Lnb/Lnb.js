import { CategoryBtn, StatusBtn } from './LnbStyles'
import { CategoryList } from '../../data/LnbData'

function Lnb() {
  return (
    <>
      <CategoryBtn>전체보기</CategoryBtn>
      {CategoryList.map((category, idx) => (
        <CategoryBtn key={idx}>{category}</CategoryBtn>
      ))}
      <StatusBtn />
      <StatusBtn />
      <StatusBtn />
    </>
  )
}

export default Lnb
