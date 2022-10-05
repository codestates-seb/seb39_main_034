import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Milestone from '../components/Milestone/Milestone'
import Todolist from '../components/Todo/Todolist'
import Timelinelist from '../components/Timeline/Timelinelist'
import TimelineCreate from '../components/Timeline/TimelineCreate'
import Commentlist from '../components/Comment/Commentlist'
import { TodoCreate } from '../components/Todo/TodoCreate'
import { Col, Container, Row } from '../styles/globalStyles'
import { PlusBtn } from '../components/Widget/WidgetStyle'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer/Footer'

function DetailView() {
  const { id } = useParams()

  const [milestoneData, setMilestoneData] = useState({
    endDate: '',
    image: {},
    member: '',
    category: '',
    profileImage: '',
  }) // 목표 데이터 받는 곳
  const [todoData, setTodoData] = useState([]) // 투두 데이터 받는 곳
  const [timelineData, setTimelineData] = useState([]) // 타임라인 데이터 받는 곳
  const [followerData, setFollowerData] = useState([]) // 팔로우 데이터 받는 곳
  const [likerData, setLikerData] = useState([]) // 응원자(liker) 데이터 받는 곳
  const [commentData, setCommentData] = useState([]) // 코멘트 데이터 받는 곳
  const [metaData, setMetaData] = useState({}) // 메타 데이터 받는 곳

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

  const getTimelineData = useCallback(() => {
    try {
      axios.get(`/v1/goal/${id}`).then((res) => {
        setTimelineData(res.data.goal.timelineList)
      })
    } catch (err) {
      console.log('ERROR getTodo: ', err)
    }
  }, [timelineData])

  const getCommentData = useCallback(() => {
    try {
      axios.get(`/v1/goal/${id}`).then((res) => {
        setCommentData(res.data.goal.commentList)
      })
    } catch (err) {
      console.log('ERROR getComment: ', err)
    }
  })

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

  const getMetaData = useCallback(() => {
    try {
      axios.get(`/v1/goal/${id}`).then((res) => {
        setMetaData(res.data.metadata)
      })
    } catch (err) {
      console.log('ERROR getMeta: ', err)
    }
  }, [metaData])

  const getDetail = () => {
    try {
      axios.get(`/v1/goal/${id}`).then((res) => {
        console.log(res.data)
        setMilestoneData(res.data.goal)
        setMetaData(res.data.metadata)
        setTodoData(res.data.goal.todoList)
        setCommentData(res.data.goal.commentList)
        setTimelineData(res.data.goal.timelineList)
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
            <Milestone
              goalId={id}
              writer={writer}
              metaData={metaData}
              milestoneData={milestoneData}
              followerData={followerData}
              likerData={likerData}
              getFollower={getFollower}
              getLiker={getLiker}
            ></Milestone>
          </Col>
        </Row>
        <Row>
          <Col>
            <Todolist
              writer={writer}
              todoData={todoData}
              metaData={metaData}
              getTodoData={getTodoData}
              getMetaData={getMetaData}
            ></Todolist>
          </Col>
          <Col>
            {onCreateTodolist && (
              <TodoCreate
                goalId={id}
                setOnCreateTodolist={setOnCreateTodolist}
                setTodoData={setTodoData}
                getTodoData={getTodoData}
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
              title={milestoneData.title}
              timelineData={timelineData}
              setTimelineData={setTimelineData}
              getTimelineData={getTimelineData}
              writer={writer}
              mode="limit"
            ></Timelinelist>
          </Col>
          <Col>
            {onCreateTimeline && (
              <TimelineCreate
                setOnCreateTimeline={setOnCreateTimeline}
                getTimelineData={getTimelineData}
                metaData={metaData}
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
            {/* <Reaction
              goalId={id}
              writer={writer}
              followerData={followerData}
              likerData={likerData}
              metaData={metaData}
              getFollower={getFollower}
              getLiker={getLiker}
            ></Reaction> */}
          </Col>
        </Row>
        <Row>
          <Col>
            <Commentlist
              goalId={id}
              commentData={commentData}
              getCommentData={getCommentData}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default DetailView
