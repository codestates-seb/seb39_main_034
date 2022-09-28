import { Container, Row, Col } from '../styles/globalStyles'
import {
  BannerContainer,
  Concept,
  FeaturesContainer,
  MemberContainer,
  Wrapper,
  FooterContainer,
} from '../components/Landing/LandingStyle'
import { useState, useEffect, useRef } from 'react'
import { FaChevronCircleRight } from 'react-icons/fa'

function Landing() {
  const featureList = [
    { name: '목표 작성', image: 'create_goal.png' },
    { name: '할일 작성', image: 'todo.png' },
    { name: '타임라인 작성', image: 'timeline.png' },
    { name: '코멘트 작성', image: 'comment.png' },
    { name: '로그인', image: 'login.png' },
    { name: '회원가입', image: 'signup.png' },
  ]

  const memberList = useRef([
    {
      name: 'member1',
      image: 'member1.jpg',
    },
    {
      name: 'member2',
      image: 'member2.jpeg',
    },
    {
      name: 'member3',
      image: 'member3.png',
    },
    {
      name: 'member4',
      image: 'member4.png',
    },
  ])

  const [current, setCurrent] = useState(0)
  const [currentTab, setCurrentTab] = useState(0)
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
    setCurrentTab(index)
  }

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` })
  }, [current])

  return (
    <Wrapper>
      <BannerContainer>
        <p>
          우리 함께,
          <br />
          목표를 달성해 봐요
        </p>
      </BannerContainer>
      <Container>
        <Row>
          <Col>
            <Concept>
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
      <FeaturesContainer>
        <Container>
          <h2>ㅇㅇ의 주요 기능</h2>
          <div className="feature__content">
            <ul className="tabmenu">
              {featureList.map((item, idx) => (
                <button
                  key={idx}
                  className={currentTab === idx ? 'submenu focused' : 'submenu'}
                  onClick={() => selectMenuHandler(idx)}
                >
                  <span>{item.name}</span>
                  <span
                    className={
                      currentTab === idx ? 'subicon focused' : 'subicon'
                    }
                  >
                    <FaChevronCircleRight size={20} color={'white'} />
                  </span>
                </button>
              ))}
            </ul>
            <div className="tabimg">
              {/* public 폴더 안의 assets 폴더 안에 이미지를 가져옴.
                 json에 image key의 value를 이미지 파일 이름으로 지정 후 불러옴. */}
              <img
                src={`${process.env.PUBLIC_URL}/assets/${featureList[currentTab].image}`}
                alt="img"
              />
            </div>
          </div>
        </Container>
      </FeaturesContainer>
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
                        {item.name}
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/${item.image}`}
                          alt="img"
                        />
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
      <FooterContainer>Footer</FooterContainer>
    </Wrapper>
  )
}

export default Landing
