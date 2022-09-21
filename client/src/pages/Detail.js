import { Col, Container, Row } from '../styles/globalStyles'
import Milestone from '../components/Milestone/Milestone'
import Todo from '../components/Todo/Todolist'
import { ProgressBar } from '../components/Todo/TodolistStyle'
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

  const [data, setData] = useState({
    goal: { todoList: [] },
    metaData: [],
  })
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

  console.log('axios 호출 전에:', data)
  useEffect(() => {
    async function getDetail() {
      await axios
        .get(`/v1/goal/${id}`)
        .then((res) => {
          console.log(res.data)
          setData(res.data)
        })
        .catch((err) => {
          console.log('ERROR: ', err)
        })
    }
    getDetail()
  }, [])
  // console.log('axios 호출 밖에서:', goals)

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Milestone data={data}></Milestone>
          </Col>
        </Row>
        <Row>
          <h3>할일</h3>
          <Col>
            <ProgressBar total={5} done={2}></ProgressBar>
          </Col>
          <Col>
            <Todo data={data}></Todo>
          </Col>
          <Col>{openCreateChecklist && <TodoCreate />}</Col>
          <Col>
            <PlusBtn onClick={createChecklistToggle}></PlusBtn>
          </Col>
        </Row>
        <Row>
          <h3>타임라인</h3>
          <Col>
            <Timeline onClick={openTimelineEditModal}></Timeline>
          </Col>
          <Col>
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
