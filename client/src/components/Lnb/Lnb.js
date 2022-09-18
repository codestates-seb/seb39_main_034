import { Container, Row } from '../../styles/responsive'
import { CategoryBtn, StatusBtn, CreateBtn } from './LnbStyle'

function Lnb() {
  return (
    <Container>
      <Row>
        <CategoryBtn>전체보기</CategoryBtn>
        <CategoryBtn>운동</CategoryBtn>
        <CategoryBtn>생활습관</CategoryBtn>
        <CategoryBtn>독서</CategoryBtn>
        <CategoryBtn>독서</CategoryBtn>
        {/* '운동', '생활습관', '독서', '공부' */}
        {/* {CategoryList.map((category, idx) => (
        <CategoryBtn key={idx}>{category}</CategoryBtn>
      ))} */}
        <StatusBtn status="pending" />
        <StatusBtn status="success" />
        <StatusBtn status="fail" />
        <CreateBtn />
      </Row>
    </Container>
  )
}

export default Lnb
