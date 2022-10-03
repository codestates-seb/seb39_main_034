import { Container, Row, Col } from '../styles/globalStyles'
import { NewMilestone } from '../components/Milestone/NewMilestone'

function Goal() {
  return (
    <Container>
      <Row>
        <Col>
          <NewMilestone />
        </Col>
      </Row>
    </Container>
  )
}

export default Goal
