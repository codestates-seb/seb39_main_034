import { useState } from 'react'
import { Container, Row, Col } from '../styles/responsive'
import { MyLnb } from '../components/MyPannel//MyPannelStyle'
import { CategoryBtn } from '../components/Lnb/LnbStyle'
import { EventBanner } from '../components/Widget/WidgetStyle'

export default function Event() {
  const [tab, setTab] = useState('진행중')

  const handleClick = (e) => {
    setTab(e.target.value)
  }
  return (
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
        <Row minHeight={'80vh'} direction={'column'} justify={'start'}>
          <Col>
            <EventBanner
              url={
                'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/49d5d418-3b5b-4f04-9a50-6ad253bc9198/event01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221004T144205Z&X-Amz-Expires=86400&X-Amz-Signature=ab875ed9570499bfa1dd9b75cc73e9945bd798eb802f3394cd8fa02cbbae07b1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22event01.jpg%22&x-id=GetObject'
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
                'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/99fd9b44-3ff9-4174-a2cd-9fa55b199376/event02.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221004T145548Z&X-Amz-Expires=86400&X-Amz-Signature=073a0b95eef49a05b20017b71f055d301934e233bac656ac1d05a80586db497e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22event02.jpg%22&x-id=GetObject'
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
        <Row minHeight={'80vh'} direction={'column'} justify={'start'}>
          <Col>
            <EventBanner
              url={
                'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/76c6c4fd-c317-4a6a-9432-47972eeade54/event03.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221004T143901Z&X-Amz-Expires=86400&X-Amz-Signature=7170f226f0a8f01a1059b72d5e7ec7e66ebeaf9eaa77e89f2c73f1b3d46951ea&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22event03.jpg%22&x-id=GetObject'
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
  )
}
