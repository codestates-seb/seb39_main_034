import { Container, Row, Col } from '../styles/globalStyles'
import Milestone from '../components/Milestone/Milestone'
import Checklist from '../components/Todo/Checklist'
import Timeline from '../components/Timeline/Timeline'

function DetailView() {
  return (
    <Container>
      <Row>
        <Col>
          <Milestone></Milestone>
        </Col>
      </Row>
      <Row>
        <Checklist></Checklist>
      </Row>
      <Row>
        <Timeline></Timeline>
      </Row>
    </Container>
  )
}

export default DetailView
