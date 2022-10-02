import styled from 'styled-components'
import { Container } from '../../styles/responsive'
import theme from '../../styles/theme'
import { BsCheck } from 'react-icons/bs'
import { Input } from '../../styles/globalStyles'

const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 4px 0;
  margin-bottom: 4px;
  > div {
    flex-basis: 36px;
  }
`

const ProgressBarStyle = styled.div`
  width: 200px;
  height: 34px;
  flex-grow: 10;
  @keyframes increase {
    0% {
      width: 0%;
    }
    50% {
      width: ${({ percentage }) => percentage}*7 / 10%;
    }
    100% {
      width: ${({ percentage }) => percentage}%;
    }
  }
  .wrapper {
    width: 100%;
    height: 34px;
    border-radius: 34px;
    background: ${({ theme }) => theme.border};
    font-weight: 600;
    font-size: 0.8rem;
  }
  .inner {
    width: ${({ percentage }) => percentage}%;
    height: 34px;
    border-radius: 34px;
    float: left;
    padding: 0;
    background: ${({ theme }) => theme.violet_m};
    animation: increase 1s ease;
  }
`

const ProgressBarCount = styled.div`
  flex-grow: 1;
  font-weight: 500;
  text-align: center;
  line-height: 32px;
  color: ${({ color, theme }) => (color ? theme.violet_m : '')};
`

export const ProgressBar = ({ todoData }) => {
  let total = todoData.length
  let completed = todoData.filter((todo) => todo.completed === 1).length
  let percentage = Math.floor((completed / total) * 100)
  return (
    <>
      <ProgressBarWrapper>
        <ProgressBarCount>
          {completed} / {total}
        </ProgressBarCount>
        <ProgressBarStyle percentage={percentage}>
          <div className="wrapper">
            <div className="inner"></div>
          </div>
        </ProgressBarStyle>
        <ProgressBarCount color="violet">{percentage}%</ProgressBarCount>
      </ProgressBarWrapper>
    </>
  )
}

export const TodoList = styled(Container)``
export const Remove = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.border};
  cursor: pointer;
  &:hover {
    color: red;
  }
  /* display: none; */
`

export const Edit = styled(Remove)``

export const TodoItemBlock = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid ${theme.border};

  /* &:hover {
    ${Remove} {
      display: initial;
    }
  } */
`

const CheckBoxBase = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.violet_m};
  font-size: 36px;
  color: ${({ theme }) => theme.white};
  background: ${({ done, theme }) =>
    done ? theme.violet_m : theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`

export const CheckBox = ({ done, onClick }) => (
  <CheckBoxBase done={done} onClick={onClick}>
    <BsCheck />
  </CheckBoxBase>
)

export const Text = styled.div`
  flex: 1;
  line-height: 35px;
  font-size: ${theme.font16};
  color: ${theme.primary};
`
export const NewInput = styled(Input)`
  border-bottom: 2px solid ${theme.border};
  width: 100%;
`
