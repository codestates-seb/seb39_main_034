import styled from 'styled-components'

export const MyPannelContainer = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  > div.profile {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    font-size: ${({ theme }) => theme.font18};
    .average {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .myinfo {
      padding: 12px 0;
      span:first-child {
        margin-right: 8px;
      }
      span:last-child {
        color: ${({ theme }) => theme.violet_m};
        font-weight: 500;
      }
    }
  }
`

export const MyLnb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  border-radius: 10px;
  background: ${({ theme }) => theme.border};
`

const ProgressBarStyle = styled.div`
  width: 200px;
  height: 24px;
  flex-basis: 36px;
  flex-grow: 1;
  padding-left: 12px;
  @keyframes increase {
    0% {
      width: 0%;
    }
    50% {
      width: ${({ percentage }) => percentage}*7 / 10%;
    }
    100% {
      width: ${({ percentage }) => percentage}%;
    }
  }
  .wrapper {
    width: 100%;
    height: 100%;
    border-radius: 34px;
    background: ${({ theme }) => theme.border};
    font-weight: 600;
    font-size: 0.8rem;
  }
  .inner {
    width: ${({ percentage }) => percentage}%;
    height: 100%;
    border-radius: 34px;
    float: left;
    padding: 0;
    background: ${({ theme }) => theme.violet_m};
    animation: increase 1s ease;
  }
`

export const MyProgressBar = ({ percentage }) => {
  return (
    <ProgressBarStyle percentage={percentage}>
      <div className="wrapper">
        <div className="inner"></div>
      </div>
    </ProgressBarStyle>
  )
}

export const AlertModalContainer = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  width: 28%;
  min-width: 300px;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0px 0px 12px ${({ theme }) => theme.tertiary};
  z-index: 10;

  .contents {
    overflow: wrap;
    padding: 32px;
    overflow-y: scroll;
    > p {
      :first-child {
        padding: 4px 0 12px 0;
        font-size: ${({ theme }) => theme.font18};
        font-weight: 500;
        line-height: 32px;
        span {
          color: ${({ theme }) => theme.violet_m};
        }
      }
      :last-child {
        font-size: ${({ theme }) => theme.font16};
        color: ${({ theme }) => theme.primary};
        line-height: 28px;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 28px;
    background-color: ${({ theme }) => theme.violet_m};
    button {
      color: ${({ theme }) => theme.background};
      background: none;
      border: none;
      cursor: pointer;
      :hover {
        color: ${({ theme }) => theme.primary};
      }
    }
  }
`

export const FeedTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  margin-top: 24px;
  color: ${({ theme }) => theme.dark};
  font-size: ${({ theme }) => theme.font18};
  > div:last-child {
    margin-left: 16px;
  }
`
