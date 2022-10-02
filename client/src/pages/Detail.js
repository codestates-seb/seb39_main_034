import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import Milestone from '../components/Milestone/Milestone'
import Todolist from '../components/Todo/Todolist'
import Timelinelist from '../components/Timeline/Timelinelist'
import TimelineCreate from '../components/Timeline/TimelineCreate'
import Reaction from '../components/Reaction/Reaction'
import Comment from '../components/Comment/Comment'
import { TodoCreate } from '../components/Todo/TodoCreate'
import { TimelineModal } from '../components/Timeline/TimelineModal'
import { Col, Container, Row } from '../styles/globalStyles'
import { PlusBtn, MoreBtn } from '../components/Widget/WidgetStyle'

function DetailView() {
  const { id } = useParams()
  const [milestoneData, setMilestoneData] = useState({
    endDate: '',
    image: {},
    member: '',
    profileImage: '',
  }) // 목표 데이터 받는 곳
  const [todoData, setTodoData] = useState([]) // 투두 데이터 받는 곳
  const [timelineData, setTimelineData] = useState([]) // 타임라인 데이터 받는 곳
  const [metaData, setMetaData] = useState({}) // 메타 데이터 받는 곳
  const [status, setStatus] = useState({}) // 상태값 받는 곳

  const [onCreateTodolist, setOnCreateTodolist] = useState(false) // 투두 생성 모드
  const [onCreateTimeline, setOnCreateTimeline] = useState(false) //타임라인 생성 모드
  const [onTimelineModal, setOnTimelineModal] = useState(false) // 타임라인 모달(더보기) 상태

  const openCreateTodolist = useCallback(() => {
    setOnCreateTodolist(!onCreateTodolist)
  }, [onCreateTodolist])

  const openCreateTimeline = useCallback(() => {
    setOnCreateTimeline(!onCreateTimeline)
  }, [onCreateTimeline])

  const openTimelineModal = () => {
    setOnTimelineModal(!onTimelineModal)
    document.body.style.overflow = 'hidden'
  }

  useEffect(() => {
    async function getDetail() {
      await axios
        .get(`/v1/goal/${id}`)
        .then((res) => {
          console.log(res.data)
          setMilestoneData(res.data.goal)
          setTodoData(res.data.goal.todoList)
          setTimelineData(res.data.goal.timelineList)
          setMetaData(res.data.metadata)
          setStatus(res.data.goal.status)
        })
        .catch((err) => {
          console.log('ERROR: ', err)
        })
      console.log('axios 요청')
    }
    getDetail()
  }, [])

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Milestone milestoneData={milestoneData}></Milestone>
          </Col>
        </Row>
        <Row>
          <Col>
            <Todolist
              todoData={todoData}
              setTodoData={setTodoData}
              metaData={metaData}
            ></Todolist>
          </Col>
          <Col>
            {onCreateTodolist && (
              <TodoCreate
                location="투두 작성 창"
                plusState={onCreateTodolist}
                setTodoData={setTodoData}
                setOnCreateTodolist={setOnCreateTodolist}
              />
            )}
          </Col>
          <Col>
            {/* 작성자일 경우 */}
            {!onCreateTodolist ? (
              <PlusBtn
                location="디테일 창"
                plusState={onCreateTodolist}
                onClick={openCreateTodolist}
              ></PlusBtn>
            ) : null}
            {/* 작성자 아닐 경우 null*/}
          </Col>
        </Row>
        <Row>
          <Col>
            <Timelinelist
              timelineData={timelineData}
              setTimelineData={setTimelineData}
              status={status}
              mode="limit"
            ></Timelinelist>
          </Col>
          <Col>
            {onCreateTimeline && (
              <TimelineCreate
                location="타임라인 작성 창"
                plusState={onCreateTimeline}
                setTimelineData={setTimelineData}
                setOnCreateTimeline={setOnCreateTimeline}
              />
            )}
          </Col>
          {/* 작성자일 경우 */}
          <Col>
            {!onCreateTimeline ? (
              <PlusBtn
                location="디테일 창"
                plusState={onCreateTimeline}
                onClick={openCreateTimeline}
              />
            ) : null}
          </Col>
          {/* 작성자 & 작성자 아닐 경우 */}
          <Col>
            <MoreBtn onClick={openTimelineModal}></MoreBtn>
          </Col>
        </Row>
        <Row>
          <Col>
            <Reaction></Reaction>
          </Col>
        </Row>
        <Row>
          <Col>
            <Comment />
          </Col>
        </Row>
      </Container>
      {onTimelineModal && (
        <TimelineModal
          timelineData={timelineData}
          setOnTimelineModal={setOnTimelineModal}
        />
      )}
    </>
  )
}

export default DetailView
