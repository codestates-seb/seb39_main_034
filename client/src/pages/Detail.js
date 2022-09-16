import { Container, Row, Col } from '../styles/globalStyles'
import Milestone from '../components/Milestone/Milestone'
import Todo from '../components/Todo/Todo'
import Timeline from '../components/TImeline/Timeline'
import Form from '../components/Form/Form'

function DetailView() {
  return (
    <Container>
      <Row>
        <Col>
          <Milestone></Milestone>
          <Todo></Todo>
          <Timeline></Timeline>
          <Form></Form>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailView
