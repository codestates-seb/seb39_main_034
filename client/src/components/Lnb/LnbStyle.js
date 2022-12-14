import styled from 'styled-components'
import { Button } from '../../styles/globalStyles'
import { BsPlusSquareFill } from 'react-icons/bs'

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .lists {
    display: flex;
    align-items: center;
  }
  .listName {
    width: 80px;
    height: 32px;
    flex-shrink: 0;
    padding-right: 10px;
    text-align: right;
    font-size: ${({ theme }) => theme.font18};
    line-height: 36px;
    border-right: 3px solid ${({ theme }) => theme.border};
  }
  .list {
    display: flex;
    margin: 10px;
  }
  @media screen and (max-width: ${({ theme }) => theme.mdBreakpoint}) {
    .list.category {
      flex-wrap: wrap;
      > button {
        margin-top: 8px;
      }
    }
  }
`

export const CategoryBtn = styled(Button)`
  width: 112px;
  height: 35px;
  border-radius: 30px;
  margin: 0 4px;
  color: ${({ isActive, theme }) => (isActive ? theme.white : theme.dark)};
  background: ${({ isActive, theme }) =>
    isActive ? theme.violet_m : theme.background};
  &:active {
    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.violet_m};
  }
`

const StatusBtnBase = styled(CategoryBtn)`
  width: 50px;
  height: 50px;
  display: ${({ value }) => (value === 0 ? 'none' : '')};
  div {
    font-size: 30px;
  }
`

export const StatusBtn = ({ onClick, status, idx, statusId }) => (
  <StatusBtnBase
    onClick={onClick}
    status={status}
    value={idx}
    isActive={idx == statusId ? 1 : 0}
  >
    <div>
      {status === '진행중'
        ? '🏃'
        : status === '목표달성'
        ? '🎉'
        : status === '달성실패'
        ? '💦'
        : null}
    </div>
  </StatusBtnBase>
)

const CreateBtnBase = styled.div`
  display: ${({ viewSize }) => (viewSize === 'lg' ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  width: 124px;
  height: 26px;
  font-size: ${(props) => props.theme.font16};
  color: ${({ theme }) => theme.dark};
  cursor: pointer;
  @media screen and (max-width: ${({ theme }) => theme.mdBreakpoint}) {
    display: ${({ viewSize }) => (viewSize === 'md' ? 'flex' : 'none')};
  }
  @media screen and (max-width: ${({ theme }) => theme.smBreakpoint}) {
    display: ${({ viewSize }) => (viewSize === 'sm' ? 'flex' : 'none')};
    margin: 0 10px 30px auto;
  }
`

export const CreateBtn = ({ onClick, viewSize }) => (
  <CreateBtnBase onClick={onClick} viewSize={viewSize}>
    <BsPlusSquareFill size="26" color="#C77DFF" />
    목표 작성하기
  </CreateBtnBase>
)
