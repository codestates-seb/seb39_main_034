import styled from 'styled-components'
import { Button } from '../../styles/globalStyles'

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

export const StatusBtn = styled(CategoryBtn)`
  width: 50px;
  height: 50px;
`
