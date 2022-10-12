import { useSelector } from 'react-redux'
import { Col } from '../../styles/responsive'
// import { Link } from 'react-router-dom'
import { CategoryBtn } from '../Lnb/LnbStyle'
import { MyPannelContainer, MyProgressBar, MyLnb } from './MyPannelStyle'
import { BigProfile } from '../Widget/WidgetStyle'

export default function MyPannel({ tab, onClick, metadata }) {
  const userName = useSelector((state) => state.auth.userName)

  return (
    <>
      <MyPannelContainer>
        <Col lg={4} className="profile">
          <BigProfile
            // image={
            //   'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            // }
            image={
              userName === 'joanna'
                ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member2.jpeg'
                : userName === 'sol-namoo'
                ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member1.jpg'
                : userName === 'jaeyoungkim'
                ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member3.png'
                : userName === 'AhnHyungJoon'
                ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member4.png'
                : 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png'
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
        <MyLnb tab={tab}>
          <CategoryBtn
            value={'목표'}
            isActive={tab === '목표'}
            onClick={onClick}
          >
            내 목표 보기
          </CategoryBtn>
          <CategoryBtn
            value={'피드'}
            isActive={tab === '피드'}
            onClick={onClick}
          >
            구독 피드
          </CategoryBtn>
        </MyLnb>
      </Col>
    </>
  )
}
