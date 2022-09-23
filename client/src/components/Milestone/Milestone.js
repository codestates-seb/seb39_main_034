import { MilestoneContainer } from './MilestoneStyle'
import { MainHeading } from '../../styles/globalStyles'

import moment from 'moment'
export default function Milestone({ data }) {
  // const today = new Date()
  // const dday = new Date(`
  // ${data.goal.endDate.slice(0, 4)},
  // ${data.goal.endDate.slice(5, 7)},
  // ${data.goal.endDate.slice(8)}`).getTime()
  // const gap = dday - today
  // const result = Math.ceil(gap / (1000 * 60 * 60 * 24))

  return (
    <MilestoneContainer>
      <header className="header__milestone">
        <MainHeading>{data.goal.title}</MainHeading>
        <div className="milestone__info">
          <p>유저이름</p>
          <p>시작일:{moment(data.goal.createdAt).format('YYYY-MM-DD')}</p>
          <p>종료일:{data.goal.endDate}</p>
          {/* <p>디데이: D-{result}</p> */}
          {data.goal.status === 0 ? (
            <p>진행중</p>
          ) : data.goal.status === 1 ? (
            <p>목표 달성</p>
          ) : data.goal.status === 2 ? (
            <p>달성 실패</p>
          ) : null}
        </div>
      </header>
      <h3>목표</h3>
      <div className="descriptions">
        <div className="description">
          <h4>소개</h4>
          <p>{data.goal.description}</p>
        </div>
        <div className="description">
          <h4>성공시</h4>
          <p>{data.goal.successAward}</p>
        </div>
        <div className="description">
          <h4>실패시</h4>
          <p>{data.goal.failurePenalty}</p>
        </div>
      </div>
    </MilestoneContainer>
  )
}
