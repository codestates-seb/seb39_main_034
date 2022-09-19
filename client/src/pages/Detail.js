import { Container, Row } from '../styles/globalStyles'
import Milestone from '../components/Milestone/Milestone'
import Todo from '../components/Todo/Checklist'
import Timeline from '../components/Timeline/Timeline'
import Reaction from '../components/Reaction/Reaction'
import { PlusBtn } from '../components/Widget/WidgetStyle'
import { TimelineModal } from '../components/Timeline/TimelineModal'
import { useState } from 'react'
import { TodoCreate } from '../components/Todo/TodoCreate'

function DetailView() {
  //timeline modal
  const [isOpen, setIsOpen] = useState(false)
  const [openCreateChecklist, setOpenCreateChecklist] = useState(false)
  const [isOpenTimelineEditModal, setIsOpenTimelineEditModal] = useState(false)

  const createChecklistToggle = () => {
    setOpenCreateChecklist(!openCreateChecklist)
  }

  const openTimelineEditModal = () => {
    setIsOpenTimelineEditModal(!isOpenTimelineEditModal)
  }

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
          {openCreateChecklist && <TodoCreate />}
          <PlusBtn onClick={createChecklistToggle}></PlusBtn>
        </Row>
        <Row>
          <Timeline onClick={openTimelineEditModal}></Timeline>
          <PlusBtn onClick={openTimelineModal} />
        </Row>
        <Reaction></Reaction>
      </Container>
      {isOpenTimelineEditModal && (
        <TimelineModal setIsOpen={setIsOpenTimelineEditModal} />
      )}
      {isOpen && <TimelineModal setIsOpen={setIsOpen} />}
    </>
  )
}

export default DetailView
