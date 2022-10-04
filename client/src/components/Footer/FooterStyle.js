import styled from 'styled-components'
import theme from '../../styles/theme'

export const FooterContainer = styled.div`
  width: 100%;
  background-color: ${theme.violet_d};
  height: 280px;
  color: ${theme.border};
  display: flex;
  justify-content: center;
  align-items: center;
  .department {
    text-align: end;
    padding: 50px;
    border-right: 1px solid ${theme.border};
    b {
      font-size: ${theme.font20};
      font-weight: 700;
    }
  }
  .info {
    padding: 30px;
    .member {
      display: flex;
      span {
        margin: 15px;
      }
      b {
        font-size: ${theme.font14};
      }
      p {
        font-size: ${theme.font18};
      }
    }
  }
  .link {
    display: flex;
    justify-content: space-between;
    .logo {
      width: 150px;
      height: 60px;
      background-image: url('https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_combination_sm.png');
      background-repeat: no-repeat;
      background-size: 140px;
      background-position: center;
      background-color: ${theme.violet_l};
      border-radius: 10px;
    }
    .icons {
      display: flex;
    }
    .icon {
      width: 40px;
      height: 40px;
      background-color: aliceblue;
      border-radius: 50px;
      margin: 5px;
      text-align: center;
      line-height: 40px;
      color: ${theme.primary};
      font-weight: 600;
    }
  }
`
