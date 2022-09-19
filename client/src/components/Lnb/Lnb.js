import { Container, Row } from '../../styles/responsive'
import { CategoryBtn, StatusBtn, CreateBtn } from './LnbStyle'
import { Link } from 'react-router-dom'
// const categoryList = ['운동', '생활습관', '독서', '공부']
const categoryList = ['workout', 'habit', 'reading', 'study']

function Lnb({ setCategoryQuery }) {
  function handleClick(e) {
    console.log(e.target.textContent)
    setCategoryQuery(e.target.textContent)
  }
  return (
    <Container>
      <Row>
        <CategoryBtn onClick={handleClick}>all</CategoryBtn>
        {categoryList.map((category, idx) => (
          <CategoryBtn onClick={handleClick} key={idx}>
            {category}
          </CategoryBtn>
        ))}
        <StatusBtn status="pending" />
        <StatusBtn status="success" />
        <StatusBtn status="fail" />
        <Link to="/goal">
          <CreateBtn />
        </Link>
      </Row>
    </Container>
  )
}

export default Lnb
