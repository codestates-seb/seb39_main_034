import { Container, Row } from '../../styles/responsive'
import { CategoryBtn, StatusBtn, CreateBtn } from './LnbStyle'
import { Link } from 'react-router-dom'

const categoryList = ['전체보기', '운동', '생활습관', '독서', '공부']
const statusList = ['선택안함', '진행중', '목표달성', '달성실패']

function Lnb({ categoryId, setCategoryId, statusId, setStatusId }) {
  function handleCategoryClick(e) {
    setCategoryId(e.currentTarget.value)
  }

  function handleStatusClick(e) {
    console.log(e.currentTarget.value)
    e.currentTarget.value === statusId
      ? setStatusId(null)
      : setStatusId(e.currentTarget.value)
  }

  return (
    <Container>
      <Row>
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
      </Row>
    </Container>
  )
}

export default Lnb
