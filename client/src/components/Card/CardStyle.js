import styled from 'styled-components'

export const CardWrapper = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
`

export const CategoryTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 35px;
  border-radius: 30px;
  color: ${({ theme }) => theme.white};
  font-size: ${(props) => props.theme.font16};
  background: ${({ theme }) => theme.violet_m};
  filter: drop-shadow(0px 1px 3px rgba(115, 115, 115, 0.25));
`
const StatusTagBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
    font-size: ${(props) => props.theme.font16};
  }
`

export const StatusTag = ({ status }) => (
  <StatusTagBase>
    <div className="emoji">
      {status === 'pending'
        ? '🏃'
        : status === 'success'
        ? '🎉'
        : status === 'fail'
        ? '💦'
        : null}
    </div>
    <div className="text">
      {status === 'pending'
        ? '진행중'
        : status === 'success'
        ? '목표달성'
        : status === 'fail'
        ? '달성실패'
        : null}
    </div>
  </StatusTagBase>
)
