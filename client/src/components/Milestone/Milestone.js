import { Container, Row } from '../../styles/responsive'
import { ProgressBar } from './MilestoneStyle'

function Milestone() {
  return (
    <Container>
      <Row>
        <ProgressBar total={5} current={2}></ProgressBar>
      </Row>
    </Container>
  )
}

export default Milestone
