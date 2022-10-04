import styled from 'styled-components'
import { Button } from '../../styles/globalStyles'

export const ReactionBar = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.border};
  .reaction {
    p {
      padding: 5px 0;
    }
  }
  .button__reaction {
    > div {
      display: flex;
    }
    > div > div {
      display: flex;
      align-items: center;
      padding: 0 5px;
    }
  }
`

const ReactionBtnBase = styled(Button)`
  width: 44px;
  height: 44px;
  margin-right: 8px;
  border-radius: 22px;
  background: ${({ follower, liker, theme }) =>
    follower || liker ? theme.violet_m : theme.background};
  &:active {
    background: ${({ theme }) => theme.violet_m};
  }
`

export const SubscribeBtn = ({ onClick, follower }) => (
  <ReactionBtnBase onClick={onClick} follower={follower}>
    {follower ? '➖' : '➕'}
  </ReactionBtnBase>
)

export const CheerBtn = ({ onClick, liker }) => (
  <ReactionBtnBase onClick={onClick} liker={liker}>
    {liker ? '✊' : '👍'}
  </ReactionBtnBase>
)
