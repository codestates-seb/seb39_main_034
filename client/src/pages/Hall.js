import { HallContainer } from '../components/Hall/HallStyle'
import { Container } from '../styles/responsive'
import Footer from '../components/Footer/Footer'
import {
  CardWrapper,
  CardBanner,
  CategoryBadge,
  CardBody,
  StatusBadge,
  CardFooter,
} from '../components/Card/CardStyle'
import { Profile } from '../components/Widget/WidgetStyle'

export default function Hall() {
  return (
    <HallContainer>
      <Container>
        <div className="awards">
          <h3>목표 달성을 가장 많이 한 유저 </h3>
          <div className="award second">
            <div className="img-box">
              <img
                src="https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png"
                alt="img"
              ></img>
            </div>
            <div>2</div>
          </div>
          <div className="award first">
            <div className="img-box">
              <img
                src="https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png"
                alt="img"
              ></img>
            </div>
            <div>1</div>
          </div>
          <div className="award third">
            <div className="img-box">
              <img
                src="https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png"
                alt="img"
              ></img>
            </div>
            <div>3</div>
          </div>
        </div>
        <div className="top">
          <section>
            <h3>팔로우 TOP3</h3>
            <CardWrapper>
              <CardBanner>
                <CategoryBadge>카테고리</CategoryBadge>
              </CardBanner>
              <CardBody>
                <h4>팔로우가 가장 많은 목표 카드</h4>
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
                  <span className="item-text">0/1개의 할일</span>
                </div>
                <div className="item">
                  <span className="item-title">구독</span>
                  <span className="item-text">1명이 구독하고 있어요</span>
                </div>
              </CardBody>
              <CardFooter>
                <Profile author="고프로"></Profile>
              </CardFooter>
            </CardWrapper>
            <p>1. 팔로우가 가장 많은 목표</p>
            <p>2. 팔로우가 두 번째로 많은 목표</p>
            <p>3. 팔로우가 세 번째로 많은 목표</p>
          </section>
          <section>
            <h3>응원 TOP3</h3>
            <CardWrapper>
              <CardBanner>
                <CategoryBadge>카테고리</CategoryBadge>
              </CardBanner>
              <CardBody>
                <h4>응원하기 가장 많은 목표 카드</h4>
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
                  <span className="item-text">0/1개의 할일</span>
                </div>
                <div className="item">
                  <span className="item-title">구독</span>
                  <span className="item-text">1명이 구독하고 있어요</span>
                </div>
              </CardBody>
              <CardFooter>
                <Profile author="조안나"></Profile>
              </CardFooter>
            </CardWrapper>
            <p>1. 응원하기가 가장 많은 목표</p>
            <p>2. 응원하기가 두 번째로 많은 목표</p>
            <p>3. 응원하기가 세 번째로 많은 목표</p>
          </section>
          <section>
            <h3>조회수 TOP3</h3>
            <CardWrapper>
              <CardBanner>
                <CategoryBadge>카테고리</CategoryBadge>
              </CardBanner>
              <CardBody>
                <h4>조회수가 가장 많은 목표 카드</h4>
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
                  <span className="item-text">0/1개의 할일</span>
                </div>
                <div className="item">
                  <span className="item-title">구독</span>
                  <span className="item-text">1명이 구독하고 있어요</span>
                </div>
              </CardBody>
              <CardFooter>
                <Profile author="작심삼일"></Profile>
              </CardFooter>
            </CardWrapper>
            <p>1. 조회수가 가장 많은 목표</p>
            <p>2. 조회수가 두 번째로 많은 목표</p>
            <p>3. 조회수가 세 번째로 많은 목표</p>
          </section>
        </div>
      </Container>
      <Footer />
    </HallContainer>
  )
}
