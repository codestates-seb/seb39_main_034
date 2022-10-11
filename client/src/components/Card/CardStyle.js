import styled from 'styled-components'

export const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin: 12px 0;

  .card_back {
    position: relative;
    top: -400px;
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
  }

  &:hover {
    .card_front {
      transform: rotateY(-180deg);
      -webkit-transform: rotateY(-180deg);
      -ms-transform: rotateY(-180deg);
      -moz-transform: rotateY(-180deg);
      -o-transform: rotateY(-180deg);
    }
    .card_back {
      transform: rotateY(0deg);
      -webkit-transform: rotateY(0deg);
      -ms-transform: rotateY(0deg);
      -moz-transform: rotateY(0deg);
      -o-transform: rotateY(0deg);
    }
  }
`

export const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: all 1.5s;
  -webkit-transition: all 1.5s;
  -moz-transition: all 1.5s;
  -o-transition: all 1.5s;
  width: 100%;
  height: 400px;
  color: ${({ theme }) => theme.dark};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 1px 3px rgba(50, 50, 50, 0.25);
  ${({ status }) =>
    status === '진행중'
      ? null
      : `&::after{position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: black;
   opacity: 0.2;
   content:''}`}

  div.card_back_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    background-color: ${({ theme }) => theme.violet_m};

    div.card_back_logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.background};
      background-image: url('https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_combination_sm.png');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      margin-bottom: 20px;
    }

    div.card_back_desc {
      width: 250px;
      height: auto;
      overflow: hidden;
      text-align: center;
      font-size: ${(props) => props.theme.font16};
      color: ${({ theme }) => theme.background};
      font-weight: 500;
      line-height: 28px;
    }
  }
`
export const Sticker = styled.img`
  position: absolute;
  top: 30px;
  left: 30px;
  width: auto;
  height: 100px;
  transform: rotate(-10deg);
  z-index: 1;
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
  padding: 0 28px;
  /* margin: 0 auto; */
  .card_title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 54px;
    margin: 4px 0 6px 0;
    > h4 {
      width: 100%;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
      font-size: ${(props) => props.theme.font20};
      font-weight: 500;
      line-height: 28px;
    }
  }
  .item {
    height: 32px;
    padding: 0 6px;
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
  background-color: ${({ theme }) => theme.background};
  > div {
    float: right;
  }
`
