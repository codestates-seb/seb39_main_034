import { Container, Row, Col } from '../../styles/responsive'
import { CategoryBtn, StatusBtn, CreateBtn } from './LnbStyle'
import { Link } from 'react-router-dom'

const categoryList = ['전체보기', '운동', '생활습관', '독서', '공부']
const statusList = ['선택안함', '진행중', '목표달성', '달성실패']

function Lnb({
  categoryId,
  setCategoryId,
  statusId,
  setStatusId,
  setPageNumber,
}) {
  function handleCategoryClick(e) {
    setCategoryId(e.currentTarget.value)
    setPageNumber(1)
  }

  function handleStatusClick(e) {
    console.log(e.currentTarget.value)
    e.currentTarget.value === statusId
      ? setStatusId(null)
      : setStatusId(e.currentTarget.value)
    setPageNumber(1)
  }

  return (
    <Container>
      <Row>
        <Col lg={12} sm={4}>
          {categoryList.map((category, idx) => (
            <CategoryBtn
              onClick={handleCategoryClick}
              key={idx}
              value={idx}
              isActive={idx == categoryId ? 1 : 0}
            >
              {category}
            </CategoryBtn>
          ))}
        </Col>
        <Col>
          {statusList.map((status, idx) => (
            <StatusBtn
              key={idx}
              onClick={handleStatusClick}
              status={status}
              idx={idx}
              statusId={statusId}
            ></StatusBtn>
          ))}
          <Link to="/goal">
            <CreateBtn />
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Lnb
