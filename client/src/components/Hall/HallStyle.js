import styled from 'styled-components'
import theme from '../../styles/theme'

export const HallContainer = styled.div`
  width: 100%;
  h3.awards {
    padding: 140px 0 20px 0;
    font-size: ${theme.font20};
    padding-left: 20px;
  }
  div.awards {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    width: 100%;
    height: auto;
    padding: 0 40px;
    > .award {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        margin: 10px 20px;
      }
      .podium {
        width: 160px;
        height: auto;
        font-size: ${theme.font20};
        text-align: center;
        line-height: 24px;
        border-radius: 5px;
        background-color: ${theme.violet_m};
        span {
          font-weight: 500;
          color: ${theme.background};
        }
        &.first {
          padding: 20px;
        }
        &.second {
          padding: 12px;
        }
        &.third {
          padding: 8px;
        }
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

  h3.top {
    padding: 50px 0 20px 0;
    font-size: ${theme.font20};
    padding-left: 24px;
  }
  div.top {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    width: 100%;
    padding-bottom: 150px;
    section {
      width: 100%;
      /* flex-grow: 1; */
      padding: 8px 0 12px 0;
      border-radius: 10px;
      background-color: ${theme.border};
      box-shadow: 4px 4px 3px ${theme.background};
      text-align: center;
      cursor: pointer;
      .card_wrapper {
        background-color: ${theme.background};
        &::after {
          background: none;
        }
      }
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
