import { Col, Container, Row } from '../styles/globalStyles'
import Milestone from '../components/Milestone/Milestone'
import Todo from '../components/Todo/Checklist'
import Timeline from '../components/Timeline/Timeline'
import Reaction from '../components/Reaction/Reaction'
import { PlusBtn } from '../components/Widget/WidgetStyle'
import { TimelineModal } from '../components/Timeline/TimelineModal'
import { useState, useEffect } from 'react'
import { TodoCreate } from '../components/Todo/TodoCreate'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function DetailView() {
  //timeline modal
  const [isOpen, setIsOpen] = useState(false)
  const [openCreateChecklist, setOpenCreateChecklist] = useState(false)
  const [isOpenTimelineEditModal, setIsOpenTimelineEditModal] = useState(false)

  const [goals, setGoals] = useState([])
  const { id } = useParams()

  const createChecklistToggle = () => {
    setOpenCreateChecklist(!openCreateChecklist)
  }

  const openTimelineEditModal = () => {
    setIsOpenTimelineEditModal(!isOpenTimelineEditModal)
  }

  const openTimelineModal = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    console.log('test:', goals)
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/goal/${id}`)
      .then((res) => {
        // console.log(res.data)
        setGoals(res.data)
      })
      .catch((err) => {
        console.log('ERROR: ', err)
      })
  }, [])
  console.log('test2:', goals)

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Milestone goals={goals}></Milestone>
          </Col>
        </Row>
        <Row>
          <Col>
            {' '}
            <Todo></Todo>
            {openCreateChecklist && <TodoCreate />}
            <PlusBtn onClick={createChecklistToggle}></PlusBtn>
          </Col>
        </Row>
        <Row>
          <Col>
            <Timeline onClick={openTimelineEditModal}></Timeline>
            <PlusBtn onClick={openTimelineModal} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Reaction></Reaction>
          </Col>
        </Row>
      </Container>
      {isOpenTimelineEditModal && (
        <TimelineModal setIsOpen={setIsOpenTimelineEditModal} />
      )}
      {isOpen && <TimelineModal setIsOpen={setIsOpen} />}
    </>
  )
}

export default DetailView
