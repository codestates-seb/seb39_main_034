import { MilestoneContainer } from './MilestoneStyle'
import { MainHeading } from '../../styles/globalStyles'

import moment from 'moment'
import DeleteMilestone from './DeleteMilestone'
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
        {data.image === null || '' ? (
          <div className="imgbox">
            {/* 이미지 없을 경우 기본 이미지 */}
            <img
              src="https://www.telegraph.co.uk/content/dam/health-fitness/2018/08/31/TELEMMGLPICT000156474637_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=680"
              alt="img"
            />
          </div>
        ) : (
          <div className="imgbox">
            <img src={data.image.url} alt="img" />
          </div>
        )}
        <div className="header__milestone--title">
          <MainHeading>{data.title}</MainHeading>
          <DeleteMilestone goalId={data.goalId} />
        </div>
        <div className="milestone__info">
          <p>유저이름</p>
          <p>시작일:{moment(data.createdAt).format('YYYY-MM-DD')}</p>
          <p>종료일:{data.endDate}</p>
          {/* <p>디데이: D-{result}</p> */}
          {data.status === 0 ? (
            <p>진행중</p>
          ) : data.status === 1 ? (
            <p>목표 달성</p>
          ) : data.status === 2 ? (
            <p>달성 실패</p>
          ) : null}
        </div>
      </header>
      <h3>목표</h3>
      <div className="descriptions">
        <div className="description">
          <h4>소개</h4>
          <p>{data.description}</p>
        </div>
        <div className="description">
          <h4>성공시</h4>
          <p>{data.successAward}</p>
        </div>
        <div className="description">
          <h4>실패시</h4>
          <p>{data.failurePenalty}</p>
        </div>
      </div>
    </MilestoneContainer>
  )
}
