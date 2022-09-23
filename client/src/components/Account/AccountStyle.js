import styled from 'styled-components'
import { Button, Input } from '../../styles/globalStyles'

export const FormWrapper = styled.div`
  width: 100%;
  padding-top: 100px;
  h2 {
    text-align: center;
  }
  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px auto;
    font-size: ${({ theme }) => theme.font14};
    color: ${({ theme }) => theme.secondary};
    font-weight: 500;
    a {
      color: ${({ theme }) => theme.violet_m};
    }
  }
`

export const InputForm = styled.div`
  padding: 23px 0;
  > h4 {
    padding: 16px 0 8px 0;
    color: ${({ theme }) => theme.secondary};
  }
  > div {
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 10px;
    font-size: ${({ theme }) => theme.font16};
    color: ${({ theme }) => theme.tertiary};
    svg {
      margin: 0 12px;
    }
  }
`

export const InputBox = styled(Input)`
  width: 100%;
  height: 100%;
`

export const AccountBtn = styled(Button)`
  width: 100%;
  height: 55px;
  margin: 6px 0;
  color: ${({ bg }) =>
    bg === 'white' ? ({ theme }) => theme.dark : ({ theme }) => theme.white};
  background: ${({ bg }) =>
    bg === 'white'
      ? ({ theme }) => theme.background
      : bg === 'dark'
      ? ({ theme }) => theme.dark
      : ({ theme }) => theme.violet_m};
`
