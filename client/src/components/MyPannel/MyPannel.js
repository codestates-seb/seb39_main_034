import { useSelector } from 'react-redux'
import { Col } from '../../styles/responsive'
// import { Link } from 'react-router-dom'
import { CategoryBtn } from '../Lnb/LnbStyle'
import { MyPannelContainer, MyProgressBar, MyLnb } from './MyPannelStyle'
import { BigProfile } from '../Widget/WidgetStyle'

export default function MyPannel({ metadata }) {
  const userName = useSelector((state) => state.auth.userName)
  return (
    <>
      <MyPannelContainer>
        <Col lg={4} className="profile">
          <BigProfile
            image={
              'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            author={userName}
          ></BigProfile>
        </Col>
        <Col lg={8} className="info">
          <div className="myinfo">
            <span>진행중 목표</span>
            <span>{metadata.numberOfOngoingGoals}개</span>
          </div>
          <div className="myinfo">
            <span>종료된 목표</span>
            <span>{metadata.numberOfEndedGoals}개</span>
          </div>
          <div className="average">
            <div className="myinfo">
              <span>평균 달성률</span>
              <span>{metadata.successPercent}%</span>
            </div>
            <MyProgressBar percentage={metadata.successPercent}></MyProgressBar>
          </div>
        </Col>
      </MyPannelContainer>
      <Col lg={12}>
        <MyLnb>
          <CategoryBtn>내 목표 보기</CategoryBtn>
          <CategoryBtn>구독 피드</CategoryBtn>
        </MyLnb>
      </Col>
    </>
  )
}
