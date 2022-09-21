import { MilestoneContainer } from './MilestoneStyle'
import { MainHeading } from '../../styles/globalStyles'

import moment from 'moment'

export default function Milestone({ goals }) {
  // const today = new Date()
  // const dday = new Date(`
  // ${goals.endDate.slice(0, 4)},
  // ${goals.endDate.slice(6, 7)},
  // ${goals.endDate.slice(8)}`).getTime()
  // const gap = dday - today
  // const result = Math.ceil(gap / (1000 * 60 * 60 * 24))
  return (
    <MilestoneContainer>
      <header className="header__milestone">
        <MainHeading>{goals.title}</MainHeading>
        <div className="milestone__info">
          <p>유저이름</p>
          <p>시작일:{moment(goals.createdAt).format('YYYY-MM-DD')}</p>
          <p>종료일:{goals.endDate}</p>
          {/* <p>디데이: D-{result}</p> */}
          <p>진행중</p>
        </div>
      </header>
      <h3>목표</h3>
      <div className="descriptions">
        <div className="description">
          <h4>소개</h4>
          <p>{goals.description}</p>
        </div>
        <div className="description">
          <h4>성공시</h4>
          <p>{goals.successAward}</p>
        </div>
        <div className="description">
          <h4>실패시</h4>
          <p>{goals.failurePenalty}</p>
        </div>
      </div>
    </MilestoneContainer>
  )
}
