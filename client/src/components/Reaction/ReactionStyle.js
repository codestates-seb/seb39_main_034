import styled from 'styled-components'
import { Button } from '../../styles/globalStyles'

export const ReactionBar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 12px;
  background: ${({ theme }) => theme.border};
  div {
    margin-right: 12px;
  }
`

const ReactionBtnBase = styled(Button)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-right: 8px;
  background: ${({ click, theme }) =>
    click ? theme.violet_m : theme.background};
  &:active {
    background: ${({ theme }) => theme.violet_m};
  }
`

export const SubscribeBtn = ({ click }) => (
  <ReactionBtnBase click={click}>👀</ReactionBtnBase>
)
export const CheerBtn = ({ click }) => (
  <ReactionBtnBase click={click}>👍</ReactionBtnBase>
)
