import { HallContainer } from '../components/Hall/HallStyle'
import { Col, Container, Row } from '../styles/responsive'
import {
  CardWrapper,
  CardBanner,
  CategoryBadge,
  CardBody,
  StatusBadge,
  CardFooter,
} from '../components/Card/CardStyle'
import { Profile } from '../components/Widget/WidgetStyle'
import Footer from '../components/Footer/Footer'
// import { Link } from 'react-router-dom'
// import Card from '../components/Card/Card'

export default function Hall() {
  return (
    <HallContainer>
      <Container>
        <Row>
          <Col direction={'column'}>
            <h3 className="awards">목표 달성을 가장 많이 한 유저 </h3>
            <div className="awards">
              <div className="award second">
                <div className="img-box">
                  <img
                    src="https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png"
                    alt="img"
                  ></img>
                </div>
                <div className="podium second">
                  <span>2</span>
                  <br />
                  아무개
                </div>
              </div>
              <div className="award first">
                <div className="img-box">
                  <img
                    src="https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member2.jpeg"
                    alt="img"
                  ></img>
                </div>
                <div className="podium first">
                  <span>1</span>
                  <br />
                  조안나
                </div>
              </div>
              <div className="award third">
                <div className="img-box">
                  <img
                    src="https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png"
                    alt="img"
                  ></img>
                </div>
                <div className="podium third">
                  <span>3</span>
                  <br />
                  누구씨
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <h3 className="top">분야별 TOP3 목표</h3>
          <div className="top">
            <Col lg={4} md={6} sm={4}>
              <section>
                <h3>팔로우 TOP3</h3>
                <p>1. 팔로우가 가장 많은 목표</p>
                <CardWrapper className="card_wrapper">
                  <CardBanner
                    banner={
                      'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study2.jpg'
                    }
                  >
                    <CategoryBadge>독서</CategoryBadge>
                  </CardBanner>
                  <CardBody>
                    <h4>요새 핫한 젊은 작가 신간 3권 읽기</h4>
                    <div className="item">
                      <span className="item-title">진행</span>
                      <span className="item-text">
                        <StatusBadge
                          className="item-text"
                          status="SUCCESS"
                        ></StatusBadge>
                      </span>
                    </div>
                    <div className="item">
                      <span className="item-title">할일</span>
                      <span className="item-text">3/3개의 할일</span>
                    </div>
                    <div className="item">
                      <span className="item-title">구독</span>
                      <span className="item-text">21명이 구독하고 있어요</span>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Profile
                      author="AhnHyungJoon"
                      image={
                        'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member4.png'
                      }
                    ></Profile>
                  </CardFooter>
                </CardWrapper>
                <p>2. 팔로우가 두 번째로 많은 목표</p>
                <p>3. 팔로우가 세 번째로 많은 목표</p>
              </section>
            </Col>
            <Col lg={4} md={6}>
              <section>
                <h3>응원 TOP3</h3>
                <p>1. 응원하기가 가장 많은 목표</p>
                <CardWrapper className="card_wrapper">
                  <CardBanner
                    banner={
                      'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study2.jpg'
                    }
                  >
                    <CategoryBadge>공부</CategoryBadge>
                  </CardBanner>
                  <CardBody>
                    <h4>1달간 모던자바스크립트 딥다이브 뿌시기</h4>
                    <div className="item">
                      <span className="item-title">진행</span>
                      <span className="item-text">
                        <StatusBadge
                          className="item-text"
                          status="진행중"
                        ></StatusBadge>
                      </span>
                    </div>
                    <div className="item">
                      <span className="item-title">할일</span>
                      <span className="item-text">4/15개의 할일</span>
                    </div>
                    <div className="item">
                      <span className="item-title">구독</span>
                      <span className="item-text">16명이 구독하고 있어요</span>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Profile
                      author="sol-namoo"
                      image={
                        'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member1.jpg'
                      }
                    ></Profile>
                  </CardFooter>
                </CardWrapper>
                <p>2. 응원하기가 두 번째로 많은 목표</p>
                <p>3. 응원하기가 세 번째로 많은 목표</p>
              </section>
            </Col>
            <Col lg={4} md={6}>
              <section>
                <h3>조회수 TOP3</h3>
                <p>1. 조회수가 가장 많은 목표</p>
                <CardWrapper className="card_wrapper">
                  <CardBanner
                    banner={
                      'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/category_study2.jpg'
                    }
                  >
                    <CategoryBadge>생활습관</CategoryBadge>
                  </CardBanner>
                  <CardBody>
                    <h4>아침 6시반 기상해서 아침일기 쓰기 챌린지</h4>
                    <div className="item">
                      <span className="item-title">진행</span>
                      <span className="item-text">
                        <StatusBadge
                          className="item-text"
                          status="진행중"
                        ></StatusBadge>
                      </span>
                    </div>
                    <div className="item">
                      <span className="item-title">할일</span>
                      <span className="item-text">6/15개의 할일</span>
                    </div>
                    <div className="item">
                      <span className="item-title">구독</span>
                      <span className="item-text">17명이 구독하고 있어요</span>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Profile
                      author="재영킴"
                      image={
                        'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member3.png'
                      }
                    ></Profile>
                  </CardFooter>
                </CardWrapper>
                <p>2. 조회수가 두 번째로 많은 목표</p>
                <p>3. 조회수가 세 번째로 많은 목표</p>
              </section>
            </Col>
          </div>
        </Row>
      </Container>
      <Footer />
    </HallContainer>
  )
}
