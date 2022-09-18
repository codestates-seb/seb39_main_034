import { Container, Row } from '../styles/globalStyles'
import Milestone from '../components/Milestone/Milestone'
import Todo from '../components/Todo/Checklist'
import Timeline from '../components/Timeline/Timeline'
import Reaction from '../components/Reaction/Reaction'

function DetailView() {
  return (
    <Container>
      <Row>
        <Milestone></Milestone>
      </Row>
      <Row>
        <Todo></Todo>
      </Row>
      <Row>
        <Timeline></Timeline>
      </Row>
      <Reaction></Reaction>
    </Container>
  )
}

export default DetailView
