import { useState, useEffect, useRef } from 'react'
import {
  Wrapper,
  BannerContainer,
  Concept,
  FeaturesContainer,
  MemberContainer,
  Dots,
} from '../components/Landing/LandingStyle'
import { Container, Row, Col } from '../styles/responsive'
import { FaChevronCircleRight } from 'react-icons/fa'
import FeatureData from '../data/FeatureData'
import MemberData from '../data/MemberData'
import Footer from '../components/Footer/Footer'

const DIVIDER_HEIGHT = 5

export default function PullPage() {
  const outerDivRef = useRef()
  const memberList = useRef(MemberData)

  const [scrollIndex, setScrollIndex] = useState(1)
  const [featCurrentTab, setFeatCurrentTab] = useState(0)
  const [current, setCurrent] = useState(0)
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
  })
  const imgSize = useRef(memberList.current.length)

  const moveSlide = (i) => {
    let nextIndex = current + i

    if (nextIndex < 0) nextIndex = imgSize.current - 1
    else if (nextIndex >= imgSize.current) nextIndex = 0

    setCurrent(nextIndex)
  }

  const selectMenuHandler = (index) => {
    setFeatCurrentTab(index)
  }

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault()
      const { deltaY } = e
      const { scrollTop } = outerDivRef.current // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight // 화면 세로길이는 100vh.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(2)
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(3)
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(4)
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(4)
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(1)
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(1)
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(2)
        } else {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(3)
        }
      }
    }
    setStyle({ marginLeft: `-${current}00%` })
    const outerDivRefCurrent = outerDivRef.current
    outerDivRefCurrent.addEventListener('wheel', wheelHandler)
    return () => {
      outerDivRefCurrent.removeEventListener('wheel', wheelHandler)
    }
  }, [current])

  return (
    <>
      <Wrapper ref={outerDivRef}>
        <Dots scrollIndex={scrollIndex} />
        {/* 첫 번째 컨텐츠: 배너 */}
        <BannerContainer>
          <p>
            우리 함께,
            <br />
            목표를 달성해 봐요
          </p>
        </BannerContainer>
        {/* 두 번째 컨텐츠: 기획 */}
        <Container>
          <Row>
            <Col>
              <Concept show={scrollIndex === 2}>
                <h2>기획</h2>
                <div className="diagramm">
                  <div id="outer1" className="outer">
                    <p>
                      서로 공유하고 나아가는
                      <br />
                      열린공간
                    </p>
                  </div>
                  <div id="outer2" className="outer">
                    <p>목표달성</p>
                  </div>
                  <div className="mwrap">
                    <div className="mid"></div>
                  </div>
                </div>
              </Concept>
            </Col>
          </Row>
        </Container>
        {/* 세 번째 컨텐츠: 주요 기능 */}
        <FeaturesContainer>
          <Container>
            <h2>함께투두의 주요 기능</h2>
            <div className="feature__content">
              <ul className="tabmenu">
                {FeatureData.map((item, idx) => (
                  <button
                    key={idx}
                    className={
                      featCurrentTab === idx ? 'submenu focused' : 'submenu'
                    }
                    onClick={() => selectMenuHandler(idx)}
                  >
                    <span>{item.name}</span>
                    <span
                      className={
                        featCurrentTab === idx ? 'subicon focused' : 'subicon'
                      }
                    >
                      <FaChevronCircleRight size={20} color={'white'} />
                    </span>
                  </button>
                ))}
              </ul>
              <div className="tabimg">
                <img src={FeatureData[featCurrentTab].image} alt="img" />
              </div>
            </div>
          </Container>
        </FeaturesContainer>
        {/* 네 번째 컨텐츠: 멤버 소개 */}
        <Container>
          <Row>
            <Col>
              <MemberContainer>
                <h2>팀원 소개</h2>
                <div className="slide">
                  <button
                    className="btn"
                    onClick={() => {
                      moveSlide(-1)
                    }}
                  >
                    &lt;
                  </button>
                  <div className="window">
                    <div className="flexbox" style={style}>
                      {memberList.current.map((item, idx) => (
                        <div key={idx} className="img">
                          <p>{item.name}</p>
                          <img src={item.image} alt="img" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    className="btn"
                    onClick={() => {
                      moveSlide(1)
                    }}
                  >
                    &gt;
                  </button>
                </div>
                <div className="position">
                  {memberList.current.map((x, i) => (
                    <div
                      key={i}
                      className={i === current ? 'dot current' : 'dot'}
                    ></div>
                  ))}
                </div>
              </MemberContainer>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Wrapper>
    </>
  )
}
