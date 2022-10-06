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
                  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/49d5d418-3b5b-4f04-9a50-6ad253bc9198/event01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221006%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221006T041254Z&X-Amz-Expires=86400&X-Amz-Signature=29a8ef478c7ac2ba9b13f67ede6e3a398297e47dd5a38da42695efb9f24cdb1c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22event01.jpg%22&x-id=GetObject'
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
                  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/99fd9b44-3ff9-4174-a2cd-9fa55b199376/event02.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221006%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221006T041328Z&X-Amz-Expires=86400&X-Amz-Signature=b7f7294865b9bd82ebd66db3058386c34a51255768d71bec15fe6ccc2478a2de&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22event02.jpg%22&x-id=GetObject'
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
                  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/76c6c4fd-c317-4a6a-9432-47972eeade54/event03.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221006%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221006T041215Z&X-Amz-Expires=86400&X-Amz-Signature=323f800cd53b844eb6ef5ac59768d6327a666ef20e124d4bde06c805eb6a2e8c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22event03.jpg%22&x-id=GetObject'
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
