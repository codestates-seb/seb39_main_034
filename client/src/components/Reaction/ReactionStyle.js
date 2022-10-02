import styled from 'styled-components'
import { Button } from '../../styles/globalStyles'

export const ReactionBar = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 12px;
  display: flex;
  justify-content: end;
  align-items: center;
  background: ${({ theme }) => theme.border};
  z-index: -1;
  > div {
    margin: 0 20px;
  }
`

const ReactionBtnBase = styled(Button)`
  width: 44px;
  height: 44px;
  margin-right: 8px;
  border-radius: 22px;
  background: ${({ click, theme }) =>
    click ? theme.violet_m : theme.background};
  &:active {
    background: ${({ theme }) => theme.violet_m};
  }
`

export const SubscribeBtn = ({ click }) => (
  <ReactionBtnBase click={click}>➕</ReactionBtnBase>
)

export const CheerBtn = ({ click }) => (
  <ReactionBtnBase click={click}>👍</ReactionBtnBase>
)
