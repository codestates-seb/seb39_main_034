import styled from 'styled-components'
import theme from '../../styles/theme'

export const HallContainer = styled.div`
  .awards {
    padding-top: 150px;
    display: flex;
    justify-content: center;
    .award {
      display: flex;
      flex-direction: column;
      align-items: center;
      > div {
        width: 160px;
        height: 40px;
        line-height: 40px;
        background-color: ${theme.violet_m};
        margin: 10px 20px;
        border-radius: 5px;
        font-size: ${theme.font20};
        text-align: center;
      }
      .img-box {
        width: 60px;
        height: 60px;
        border: 1px solid ${theme.border};
        border-radius: 50px;
        background-color: ${theme.background};

        img {
          width: 100%;
          padding: 8px;
        }
      }
    }
  }
  .top {
    display: flex;
    padding: 50px 0 150px 0;
    section {
      flex-grow: 1;
      margin: 0 20px;
      text-align: center;
      background-color: ${theme.border};
      box-shadow: 4px 4px 3px ${theme.background};
      .item {
        text-align: start;
        .item-title {
          padding-right: 10px;
          border-right: 2px solid ${theme.secondary};
        }
      }
      > div {
        width: 90%;
        margin: 0 auto;
        border: 3px solid ${theme.yellow};
      }
      p {
        text-align: start;
        padding: 5px 10px;
        margin: 10px 20px;
        border-radius: 5px;
        background-color: ${theme.border_l};
      }
    }
  }
`
