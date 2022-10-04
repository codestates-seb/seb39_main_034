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
