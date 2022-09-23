import styled from 'styled-components'

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 400px;
  margin: 8px 0;
  color: ${({ theme }) => theme.dark};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
`
export const CardBanner = styled.div`
  position: relative;
  height: 40%;
  background-size: cover;
  background-position: center;
  background-image: url(${({ banner }) => banner});
  background-color: ${({ theme }) => theme.background};
  div {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`

export const CardBody = styled.div`
  padding: 0 12px;
  margin: 0 auto;
  h4 {
    width: 100%;
    height: 54px;
    margin: 6px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${(props) => props.theme.font20};
    font-weight: 500;
    line-height: 28px;
  }
  .item {
    height: 32px;
    padding: 0 12px;
    font-size: ${(props) => props.theme.font16};
    line-height: 32px;
    .item-title {
      padding-right: 4px;
      border-right: 3px solid ${({ theme }) => theme.border};
      font-weight: 500;
    }
    .item-text {
      padding-left: 12px;
    }
  }
`

export const CategoryBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 112px;
  height: 35px;
  border-radius: 30px;
  color: ${({ theme }) => theme.white};
  font-size: ${(props) => props.theme.font16};
  background: ${({ theme }) => theme.violet_m};
  filter: drop-shadow(0px 1px 3px rgba(115, 115, 115, 0.25));
`
const StatusBadgeBase = styled.div`
  display: inline-flex;
  align-items: center;
  height: 30px;
  .emoji {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    border-radius: 30px;
    background: ${({ theme }) => theme.background};
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    filter: drop-shadow(0px 1px 3px rgba(115, 115, 115, 0.25));
  }
  .text {
    font-size: ${({ theme }) => theme.font16};
    line-height: 36px;
  }
`

export const StatusBadge = ({ status }) => (
  <StatusBadgeBase>
    <div className="emoji">
      {status === '진행중'
        ? '🏃'
        : status === 'SUCCESS'
        ? '🎉'
        : status === 'FAILURE'
        ? '💦'
        : null}
    </div>
    <div className="text">
      {status === '진행중'
        ? '진행중'
        : status === 'SUCCESS'
        ? '목표달성'
        : status === 'FAILURE'
        ? '달성실패'
        : null}
    </div>
  </StatusBadgeBase>
)

export const CardFooter = styled.div`
  height: 44px;
  padding: 6px 8px;
  border-top: 1px solid ${({ theme }) => theme.border};
  > div {
    float: right;
  }
`
