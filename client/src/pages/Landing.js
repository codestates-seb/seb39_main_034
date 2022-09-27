import { Container, Row, Col } from '../styles/globalStyles'
import { Picture, Concept } from '../components/Landing/LandingStyle'

function Landing() {
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
              <div className="mwrap">
                <div className="mid"></div>
              </div>
            </div>
          </Concept>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>주요 기능</h2>
        </Col>
      </Row>
    </Container>
  )
}

export default Landing
