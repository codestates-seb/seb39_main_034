import styled from 'styled-components'
import { Button } from '../../styles/globalStyles'
import { BsPlusSquareFill } from 'react-icons/bs'

export const CategoryBtn = styled(Button)`
  width: 120px;
  height: 35px;
  border-radius: 30px;
  margin: 0 4px;
  color: ${({ theme }) => theme.dark};
  background: ${({ theme }) => theme.background};
  &:active {
    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.violet_m};
  }
`

const StatusBtnBase = styled(CategoryBtn)`
  width: 50px;
  height: 50px;
  div {
    font-size: 30px;
  }
`

export const StatusBtn = ({ status }) => (
  <StatusBtnBase>
    <div>
      {status === 'pending'
        ? '🏃'
        : status === 'success'
        ? '🎉'
        : status === 'fail'
        ? '💦'
        : null}
    </div>
  </StatusBtnBase>
)

const CreateBtnBase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 124px;
  height: 26px;
  cursor: pointer;
  div.text {
    font-size: ${(props) => props.theme.font18};
  }
`

export const CreateBtn = () => (
  <CreateBtnBase>
    <BsPlusSquareFill size="26" color="#C77DFF" />
    목표 작성하기
  </CreateBtnBase>
)
