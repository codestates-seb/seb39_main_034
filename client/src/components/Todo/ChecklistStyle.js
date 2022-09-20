import styled from 'styled-components'
import { Container, Col } from '../../styles/responsive'
import theme from '../../styles/theme'
import { BsCheck } from 'react-icons/bs'

const ProgressBarStyle = styled.div`
  width: 100%;
  height: 34px;
  border-radius: 10px;
  .wrapper {
    width: 100%;
    background-color: #dedede;
    font-weight: 600;
    font-size: 0.8rem;
  }

  .inner {
    width: ${({ percentage }) => percentage}%;
    padding: 0;
    text-align: center;
    background-color: #4f98ff;
    color: #111;
  }
`

const ProgressBarCount = styled(Col)`
  font-weight: 500;
  color: ${({ color, theme }) => (color ? theme.violet_m : '')};
`

export const ProgressBar = ({ total, current }) => {
  const percentage = Math.floor((current / total) * 100)
  return (
    <>
      <ProgressBarCount lg={1}>
        {current} / {total}
      </ProgressBarCount>
      <Col lg={10}>
        <ProgressBarStyle percentage={percentage}>
          <div className="wrapper">
            <div className="inner"></div>
          </div>
        </ProgressBarStyle>
      </Col>
      <ProgressBarCount lg={1} color="violet">
        {percentage}%
      </ProgressBarCount>
    </>
  )
}

export const TodoList = styled(Container)`
  /* border-bottom: 1px solid ${theme.primary}; */
`
export const Remove = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.border};
  cursor: pointer;
  &:hover {
    color: red;
  }
  display: none;
`

export const Edit = styled(Remove)``

export const TodoItemBlock = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid ${theme.border};

  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`

const CheckBoxBase = styled.div`
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

export const CheckBox = ({ done }) => (
  <CheckBoxBase done={done}>
    <BsCheck />
  </CheckBoxBase>
)

export const Text = styled.div`
  flex: 1;
  line-height: 35px;
  font-size: ${theme.font16};
  color: ${theme.primary};
`
