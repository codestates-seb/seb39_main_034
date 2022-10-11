import { useState } from 'react'
import { Container, Row, Col } from '../styles/responsive'
import { MyLnb } from '../components/MyPannel//MyPannelStyle'
import { CategoryBtn } from '../components/Lnb/LnbStyle'
import { EventBanner } from '../components/Widget/WidgetStyle'
import Footer from '../components/Footer/Footer'

export default function Event() {
  const [tab, setTab] = useState('진행중')

  const handleClick = (e) => {
    setTab(e.target.value)
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <MyLnb margin={'140px 0 40px 0'} bg={'none'}>
              <CategoryBtn
                value={'진행중'}
                isActive={tab === '진행중'}
                onClick={handleClick}
              >
                진행중
              </CategoryBtn>
              <CategoryBtn
                value={'피드'}
                isActive={tab === '피드'}
                onClick={handleClick}
              >
                종료
              </CategoryBtn>
            </MyLnb>
          </Col>
        </Row>
        {tab === '진행중' ? (
          <Row minHeight={'70vh'} direction={'column'} justify={'start'}>
            <Col>
              <EventBanner
                url={
                  'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/event01.jpg'
                }
              >
                <div className="event_header">
                  [팔로우 이벤트] 목표 구독하고 함께 달성하자! (~22.12.31)
                </div>
                <div className="event_content"></div>
              </EventBanner>
            </Col>
            <Col>
              <EventBanner
                url={
                  'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/event02.jpg'
                }
              >
                <div className="event_header">
                  [건강 챌린지] 초록초록 식단 3주 챌린지 (~ 22.10.14)
                </div>
                <div className="event_content"></div>
              </EventBanner>
            </Col>
          </Row>
        ) : (
          <Row minHeight={'70vh'} direction={'column'} justify={'start'}>
            <Col>
              <EventBanner
                url={
                  'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/event03.jpg'
                }
              >
                <div className="event_header">
                  [새해 이벤트] 새해 다짐 적고 선물 받아가세요! (~22.03.20)
                </div>
                <div className="event_content"></div>
              </EventBanner>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  )
}
