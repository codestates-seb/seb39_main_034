import styled from 'styled-components'
import { Button } from '../../styles/globalStyles'

export const AccountBtn = styled(Button)`
  width: 436px;
  height: 55px;
  margin: 0 4px;
  color: ${({ bg }) =>
    bg === 'white' ? ({ theme }) => theme.dark : ({ theme }) => theme.white};
  background: ${({ bg }) =>
    bg === 'white'
      ? ({ theme }) => theme.background
      : bg === 'dark'
      ? ({ theme }) => theme.dark
      : ({ theme }) => theme.violet_m};
  &:hover {
    background: ${({ theme }) => theme.violet_l};
  }
`
