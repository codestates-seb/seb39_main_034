import styled from 'styled-components'
import { Button } from '../../styles/globalStyles'
import theme from '../../styles/theme'

export const FooterContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  color: ${theme.border};
  display: flex;
  flex-direction: column;
  justify-content: center;
  article {
    background-color: ${theme.violet_d};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    .department {
      text-align: end;
      border-right: 1px solid ${theme.border};
      padding: 40px;
      b {
        font-size: ${theme.font20};
        font-weight: 700;
      }
    }
    .info {
      margin: 10px 40px;
      .member {
        span {
          display: inline-block;
          padding: 10px 0;
          margin: 10px;
          b {
            font-size: ${theme.font12};
          }
          p {
            font-size: ${theme.font14};
          }
        }
      }
      .link {
        display: flex;
        justify-content: space-between;
        .logo {
          width: 120px;
          height: 50px;
          background-image: url('https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_combination_sm.png');
          background-repeat: no-repeat;
          background-size: 110px;
          background-position: center;
          background-color: ${theme.violet_l};
          border-radius: 10px;
        }
        .icons {
          display: flex;
        }
      }
    }
  }
  .copyright {
    background-color: #0a0013;
    padding: 5px 0;
    text-align: center;
  }
`

export const IconBtn = styled(Button)`
  width: 35px;
  height: 35px;
  background-color: aliceblue;
  border-radius: 50px;
  margin: 5px;
  text-align: center;
  line-height: 40px;
  color: ${theme.primary};
  font-weight: 600;
  padding: 5px;
  &:hover {
    color: black;
  }
`
