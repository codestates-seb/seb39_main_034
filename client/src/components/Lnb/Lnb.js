import { Col } from '../../styles/responsive'
import { ListWrapper, CategoryBtn, StatusBtn, CreateBtn } from './LnbStyle'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const categoryList = ['전체보기', '운동', '생활습관', '독서', '공부']
const statusList = ['선택안함', '진행중', '목표달성', '달성실패']

function Lnb({
  categoryId,
  setCategoryId,
  statusId,
  setStatusId,
  setPageNumber,
}) {
  const isLogin = useSelector((state) => state.auth.isLogin)
  const navigate = useNavigate()

  function handleCategoryClick(e) {
    setCategoryId(e.currentTarget.value)
    setPageNumber(1)
  }

  function handleStatusClick(e) {
    e.currentTarget.value === statusId
      ? setStatusId(0)
      : setStatusId(e.currentTarget.value)
    setPageNumber(1)
  }

  function handleCreate() {
    if (isLogin === true) {
      navigate('/goal')
    } else {
      console.log(isLogin)
      alert('로그인이 필요한 서비스입니다')
      navigate('/login')
    }
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
          <div className="lists">
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
          </div>
          <div className="lists">
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
          </div>
        </ListWrapper>
        <CreateBtn onClick={handleCreate} viewSize="lg" />
      </Col>
      {/* <Col
        justify={'space-between'}
        align={'center'}
        padding={8}
        margin={'0 0 30px 0'}
      > */}
      <ListWrapper></ListWrapper>
      <CreateBtn onClick={handleCreate} viewSize="md" />
      {/* </Col> */}
    </>
  )
}

export default Lnb
