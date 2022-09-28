import { Container, Row, Col } from '../styles/globalStyles'
<<<<<<< Updated upstream
import {
  Picture,
  Concept,
  FeaturesContainer,
  MemberContainer,
} from '../components/Landing/LandingStyle'
import { useState, useEffect, useRef } from 'react'
function Landing() {
  const featureList = [
    { title: '목표 작성' },
    { title: '할일 작성' },
    { title: '타임라인 작성' },
    { title: '코멘트 작성' },
    { title: '로그인/회원가입' },
    { title: '마이페이지' },
  ]
  const memberList = useRef([
    {
      name: 'member1',
    },
    {
      name: 'member2',
    },
    {
      name: 'member3',
    },
    {
      name: 'member4',
    },
  ])
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

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` })
  }, [current])
=======
import { Picture, Concept } from '../components/Landing/LandingStyle'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { useSelector } from 'react-redux'

function Landing() {
  // const accessToken = useSelector((state) => state.auth.authorization)
  // useEffect(
  //   axios({
  //     method: 'get',
  //     url: '/v1/authenticationTest',
  //     headers: { Access: accessToken },
  //   })
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // )
>>>>>>> Stashed changes

  return (
    <Container>
      <Row>
        <Col>
          <Picture>
            <p>
              우리 함께,
              <br />
              목표를 달성해 봐요
            </p>
          </Picture>
        </Col>
      </Row>
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
              <div className="midwrap">
                <div className="mid"></div>
              </div>
            </div>
          </Concept>
        </Col>
      </Row>
      <Row>
        <Col>
          <FeaturesContainer>
            <h2>ㅇㅇ의 주요 기능</h2>
            <div className="feature__content">
              <div className="featurelist">
                {featureList.map((item, idx) => (
                  <ul key={idx}>
                    <li>{item.title}</li>
                  </ul>
                ))}
              </div>
              <div className="imgBox">
                <img src="/windows-unsplash.jpg" alt="img" />
              </div>
            </div>
          </FeaturesContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <MemberContainer>
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
  )
}

export default Landing
