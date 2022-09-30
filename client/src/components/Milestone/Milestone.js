import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { MilestoneContainer } from './MilestoneStyle'
import { MainHeading } from '../../styles/globalStyles'
import { DeleteBtn } from '../Widget/WidgetStyle'
import { StatusBadge, CategoryBadge } from '../Card/CardStyle'

export default function Milestone({ milestoneData }) {
  //D-DAY 계산
  const today = new Date()
  const dday = new Date(`
  ${milestoneData.endDate.slice(0, 4)},
  ${milestoneData.endDate.slice(5, 7)},
  ${milestoneData.endDate.slice(8)}`).getTime()
  const gap = dday - today
  const result = Math.ceil(gap / (1000 * 60 * 60 * 24))

  const navigate = useNavigate()
  const handleDeleteClick = () => {
    axios({
      method: 'delete',
      url: process.env.REACT_APP_API_URL + `/v1/goal/${milestoneData.goalId}`,
    })
      .then((res) => {
        console.log(res)
        alert('목표 삭제')
        navigate('/main')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <MilestoneContainer>
      <header className="header__milestone">
        {milestoneData.image === null || '' ? (
          <div className="imgbox">
            <CategoryBadge>{milestoneData.category.categoryName}</CategoryBadge>
            {/* 이미지 없을 경우 기본 이미지 */}
            <img
              src="https://www.telegraph.co.uk/content/dam/health-fitness/2018/08/31/TELEMMGLPICT000156474637_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=680"
              alt="img"
            />
          </div>
        ) : (
          <div className="imgbox">
            <CategoryBadge>카테고리야</CategoryBadge>
            <img src={milestoneData.image.url} alt="img" />
          </div>
        )}
        <MainHeading padding="20px 0 0 0">{milestoneData.title}</MainHeading>
        <div className="milestone__info">
          <div className="profile">
            <span className="userimg"></span>
            <span className="username">조안나</span>
          </div>
          <span className="dot">·</span>
          <span>
            시작일: {moment(milestoneData.createdAt).format('YYYY-MM-DD')}
          </span>
          <span className="dot">·</span>
          <span>종료일: {milestoneData.endDate}</span>
          <span className="dot">·</span>
          {result === undefined ? null : <span>디데이: D-{result}</span>}
          <span className="dot">·</span>
          {milestoneData.status === 0 ? (
            <StatusBadge status="진행중" />
          ) : milestoneData.result === 'SUCCESS' ? (
            <StatusBadge status="SUCCESS" />
          ) : milestoneData.result === 'FAILURE' ? (
            <StatusBadge status="FAILURE" />
          ) : null}
          {/* isLogin이 true이고 유효한 토큰인지 검증받은 후 */}
          {/* username이 작성자와 동일한 경우 */}
          <div className="delete">
            <DeleteBtn onClick={handleDeleteClick} />
          </div>
          {/* 작성자가 아닐 땐 null */}
        </div>
      </header>
      <h3>목표</h3>
      <div className="descriptions">
        <div className="description">
          <h4>소개</h4>
          <p>{milestoneData.description}</p>
        </div>
        <div className="description">
          <h4>성공시</h4>
          <p>{milestoneData.successAward}</p>
        </div>
        <div className="description">
          <h4>실패시</h4>
          <p>{milestoneData.failurePenalty}</p>
        </div>
      </div>
    </MilestoneContainer>
  )
}
