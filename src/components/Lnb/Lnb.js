import { Col } from '../../styles/responsive'
import { ListWrapper, CategoryBtn, StatusBtn, CreateBtn } from './LnbStyle'
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
      ? setStatusId(0)
      : setStatusId(e.currentTarget.value)
    setPageNumber(1)
  }

  return (
    <>
      <Col
        justify={'space-between'}
        align={'center'}
        padding={8}
        margin={'30px 0 0 0'}
      >
        <ListWrapper>
          <div className="listName">분류</div>
          <div className="list">
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
          </div>
        </ListWrapper>
        <Link to="/goal">
          <CreateBtn viewSize="lg" />
        </Link>
      </Col>
      <Col
        justify={'space-between'}
        align={'center'}
        padding={8}
        margin={'0 0 30px 0'}
      >
        <ListWrapper>
          <div className="listName">진행사항</div>
          <div className="list">
            {statusList.map((status, idx) => (
              <StatusBtn
                key={idx}
                onClick={handleStatusClick}
                status={status}
                idx={idx}
                statusId={statusId}
              ></StatusBtn>
            ))}
          </div>
        </ListWrapper>
        <Link to="/goal">
          <CreateBtn viewSize="md" />
        </Link>
      </Col>
    </>
  )
}

export default Lnb
