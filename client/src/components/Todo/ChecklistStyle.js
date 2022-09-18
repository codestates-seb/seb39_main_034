import styled from 'styled-components'
import { Container } from '../../styles/responsive'
import theme from '../../styles/theme'
import { BsCheck } from 'react-icons/bs'

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

const CheckBoxBase = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.violet_m};
  font-size: 24px;
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
