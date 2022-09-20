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
      <div className="descriptions">
        <h2>목표</h2>
        <div className="description">
          <h3>소개</h3>
          <p>{goals.description}</p>
        </div>
        <div className="description">
          <h3>성공시</h3>
          <p>{goals.successAward}</p>
        </div>
        <div className="description">
          <h3>실패시</h3>
          <p>{goals.failurePenalty}</p>
        </div>
      </div>
    </MilestoneContainer>
  )
}
