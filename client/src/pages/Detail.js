import { Container, Row } from '../styles/globalStyles'
import Milestone from '../components/Milestone/Milestone'
import Todo from '../components/Todo/Checklist'
import Timeline from '../components/Timeline/Timeline'
import Reaction from '../components/Reaction/Reaction'
import { PlusBtn } from '../components/Widget/WidgetStyle'
import { TimelineModal } from '../components/Timeline/TimelineModal'
import { useState } from 'react'

function DetailView() {
  const [isOpen, setIsOpen] = useState(false)

  const openTimelineModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Container>
        <Row>
          <Milestone></Milestone>
        </Row>
        <Row>
          <Todo></Todo>
          <PlusBtn></PlusBtn>
        </Row>
        <Row>
          <Timeline></Timeline>
          <PlusBtn onClick={openTimelineModal} />
        </Row>
        <Reaction></Reaction>
      </Container>
      {isOpen && <TimelineModal setIsOpen={setIsOpen} />}
    </>
  )
}

export default DetailView
