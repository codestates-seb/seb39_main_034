import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { MilestoneContainer, SubscribeBtn, CheerBtn } from './MilestoneStyle'
import { HeadingH3, MainHeading } from '../../styles/globalStyles'
import { DeleteBtn, Profile } from '../Widget/WidgetStyle'
import { StatusBadge, CategoryBadge } from '../Card/CardStyle'
import { useDispatch, useSelector } from 'react-redux'
import { handleAuthErr } from '../Account/TokenAuth'

export default function Milestone({
  milestoneData,
  followerData,
  likerData,
  writer,
  goalId,
  getFollower,
  getLiker,
  metaData,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector((state) => state.auth.userName) // 로그인된 유저
  const followerUser = followerData.filter((item) => item === userName) // 팔로우 리스트 중 로그인 유저 필터링
  const likerUser = likerData.filter((item) => item === userName)
  console.log(likerUser)

  //D-DAY 계산
  const today = new Date()
  const dday = new Date(`
  ${milestoneData.endDate.slice(0, 4)},
  ${milestoneData.endDate.slice(5, 7)},
  ${milestoneData.endDate.slice(8)}`).getTime()
  const gap = dday - today
  const result = Math.ceil(gap / (1000 * 60 * 60 * 24))

  // 팔로우 버튼 클릭 시 실행
  const handleClickFllower = async () => {
    try {
      await axios.get(`/v1/goal/${goalId}/following`)
      await getFollower()
    } catch (err) {
      console.log('ERROR: ', err)
    }
  }

  // 팔로우중 버튼 클릭 시 실행
  const handleClickFllowerCancle = async () => {
    try {
      await axios.get(`/v1/goal/${goalId}/following-cancellation`)
      await getFollower()
    } catch (err) {
      console.log('ERROR: ', err)
    }
  }

  // 응원하기 버튼 클릭 시 실행
  const handleClickLiker = async () => {
    try {
      await axios.get(`/v1/goal/${goalId}/liking`)
      await getLiker()
    } catch (err) {
      console.log('ERROR: ', err)
    }
  }

  // 응원중 버튼 클릭 시 실행
  const handleClickLikerCancle = async () => {
    try {
      await axios.get(`/v1/goal/${goalId}/liking-cancellation`)
      await getLiker()
    } catch (err) {
      console.log('ERROR: ', err)
    }
  }

  const handleDeleteClick = () => {
    const confirmResult = confirm('정말 목표를 삭제하시겠습니까?')
    if (confirmResult) {
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
          handleAuthErr(dispatch, navigate, err, handleDeleteClick)
        })
      alert('목표가 삭제되었습니다')
    } else {
      alert('취소되었습니다')
    }
  }

  return (
    <MilestoneContainer
      // image={
      //   milestoneData.image === null || ''
      //     ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study2.jpg'
      //     : milestoneData.image.url
      // }
      image={
        milestoneData.image
          ? milestoneData.image.url
          : milestoneData.category.categoryName === '운동'
          ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/workout.jpg'
          : milestoneData.category.categoryName === '생활습관'
          ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/breakfast_in_bed.jpg'
          : milestoneData.category.categoryName === '독서'
          ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study.jpeg'
          : milestoneData.category.categoryName === '공부'
          ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study2.jpg'
          : 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study2.jpg'
      }
    >
      <header className="header__milestone">
        <CategoryBadge className="header__category-badge">
          {milestoneData.category.categoryName}
        </CategoryBadge>
        {/* <div className="imgbox">
          {milestoneData.image === null || '' ? (
            <img
              src="https://www.telegraph.co.uk/content/dam/health-fitness/2018/08/31/TELEMMGLPICT000156474637_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=680"
              alt="img"
            />
          ) : (
            <img src={milestoneData.image.url} alt="img" />
          )}
        </div> */}

        <MainHeading padding="20px 0 0 0">{milestoneData.title}</MainHeading>
        <div className="milestone__info">
          <Profile
            // image={milestoneData.profileImage}
            image={
              milestoneData.member === 'joanna'
                ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member2.jpeg'
                : milestoneData.member === 'sol-namoo'
                ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member1.jpg'
                : milestoneData.member === 'jaeyoungkim'
                ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member3.png'
                : milestoneData.member === 'AhnHyungJoon'
                ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member4.png'
                : 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png'
            }
            author={milestoneData.member}
          />
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
          {userName === milestoneData.member ? (
            <div className="delete">
              <DeleteBtn onClick={handleDeleteClick} />
            </div>
          ) : null}

          {/* 작성자가 아닐 땐 null */}
        </div>
      </header>
      <div className="header__reaction">
        <div className="reaction">
          <HeadingH3>목표</HeadingH3>
          <div className="reaction_numbers">
            <span>팔로우 {metaData.numberOfFollowers}</span>
            <span className="dot"> · </span>
            <span>응원 {metaData.numberOfLiker}</span>
          </div>
        </div>
        <div className="button__reaction">
          {userName === writer || userName === null ? null : (
            // 로그인 유저이고 작성자가 아닐 경우
            <div>
              {/* 이미 팔로우를 한 유저라면 */}
              {followerUser[0] === userName ? (
                <div>
                  <SubscribeBtn
                    follower={true}
                    onClick={handleClickFllowerCancle}
                  />
                  <div>팔로우 중</div>
                </div>
              ) : (
                //팔로우 하지 않은 유저라면
                <div>
                  <SubscribeBtn onClick={handleClickFllower} />
                  팔로우 하기
                </div>
              )}
              {likerUser[0] === userName ? (
                <div>
                  <CheerBtn liker={true} onClick={handleClickLikerCancle} />
                  <div>응원 중</div>
                </div>
              ) : (
                <div>
                  <CheerBtn onClick={handleClickLiker} />
                  응원하기
                </div>
              )}
            </div>
          )}
        </div>
      </div>
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
