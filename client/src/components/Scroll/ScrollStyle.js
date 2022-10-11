import styled from 'styled-components'
import theme from '../../styles/theme'

export const Scroll = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
  .top {
    font-weight: bold;
    padding: 15px 10px;
    background-color: ${theme.violet_m};
    color: #fff;
    border: 1px solid rgb(210, 204, 193);
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    &:hover {
      background-color: ${theme.violet_d};
      transition-duration: 1s;
    }
  }
`
