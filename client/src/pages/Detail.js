import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Milestone from '../components/Milestone/Milestone'
import Todolist from '../components/Todo/Todolist'
import Timelinelist from '../components/Timeline/Timelinelist'
import TimelineCreate from '../components/Timeline/TimelineCreate'
import Reaction from '../components/Reaction/Reaction'
import Comment from '../components/Comment/Comment'
import { TodoCreate } from '../components/Todo/TodoCreate'
import { Col, Container, Row } from '../styles/globalStyles'
import { PlusBtn } from '../components/Widget/WidgetStyle'
import { useSelector } from 'react-redux'

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
  const [followerData, setFollowerData] = useState([]) // 팔로우 데이터 받는 곳
  const [likerData, setLikerData] = useState([]) // 응원자(liker) 데이터 받는 곳
  const [metaData, setMetaData] = useState({}) // 메타 데이터 받는 곳
  const [status, setStatus] = useState({}) // 상태값 받는 곳

  const [onCreateTodolist, setOnCreateTodolist] = useState(false) // 투두 생성 모드
  const [onCreateTimeline, setOnCreateTimeline] = useState(false) //타임라인 생성 모드

  const userName = useSelector((state) => state.auth.userName) // 로그인된 유저
  const writer = milestoneData.member
  // console.log('username: ', userName)
  // console.log('wirter: ', writer)

  const openCreateTodolist = useCallback(() => {
    setOnCreateTodolist(!onCreateTodolist)
  }, [onCreateTodolist])

  const openCreateTimeline = useCallback(() => {
    setOnCreateTimeline(!onCreateTimeline)
  }, [onCreateTimeline])

  const getTodoData = useCallback(() => {
    try {
      axios.get(`/v1/goal/${id}`).then((res) => {
        setTodoData(res.data.goal.todoList)
      })
    } catch (err) {
      console.log('ERROR getTodo: ', err)
    }
  }, [todoData])

  const getFollower = useCallback(() => {
    try {
      axios.get(`/v1/goal/${id}`).then((res) => {
        setFollowerData(res.data.goal.followerList)
      })
    } catch (err) {
      console.log('ERROR getFollower: ', err)
    }
  }, [followerData])

  const getLiker = useCallback(() => {
    try {
      axios.get(`/v1/goal/${id}`).then((res) => {
        setLikerData(res.data.goal.likerList)
      })
    } catch (err) {
      console.log('ERROR getLiker: ', err)
    }
  }, [likerData])

  const getDetail = () => {
    try {
      axios.get(`/v1/goal/${id}`).then((res) => {
        console.log(res.data)
        setMilestoneData(res.data.goal)
        setMetaData(res.data.metadata)
        setTodoData(res.data.goal.todoList)
        setTimelineData(res.data.goal.timelineList)
        setStatus(res.data.goal.status)
      })
    } catch (err) {
      console.log('ERROR: ', err)
    }
  }

  useEffect(() => {
    getDetail()
    console.log('axios 요청')
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
              metaData={metaData}
              getTodoData={getTodoData}
              writer={writer}
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
            {userName === writer ? (
              !onCreateTodolist ? (
                <PlusBtn
                  location="디테일 창"
                  plusState={onCreateTodolist}
                  onClick={openCreateTodolist}
                />
              ) : null
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
              writer={writer}
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
          {userName === writer ? (
            !onCreateTimeline ? (
              <PlusBtn
                location="디테일 창"
                plusState={onCreateTimeline}
                onClick={openCreateTimeline}
              />
            ) : null
          ) : null}
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Reaction
              goalId={id}
              writer={writer}
              followerData={followerData}
              likerData={likerData}
              metaData={metaData}
              getFollower={getFollower}
              getLiker={getLiker}
            ></Reaction>
          </Col>
        </Row>
        <Row>
          <Col>
            <Comment />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DetailView
