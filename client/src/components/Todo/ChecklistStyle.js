import styled, { css } from 'styled-components'
import { Container } from '../../styles/responsive'
import theme from '../../styles/theme'

export const TodoList = styled(Container)`
  border: 1px solid ${theme.primary};
`
export const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: grey;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: red;
  }
  display: none;
`

export const Edit = styled(Remove)``
export const TodoItemBlock = styled.div`
  display: flex;
  padding: 10px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`

export const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid skyblue;
      color: skyblue;
    `}
`
export const Text = styled.div`
  flex: 1;
  line-height: 35px;
  font-size: ${theme.font16};
  color: ${theme.primary};
`
