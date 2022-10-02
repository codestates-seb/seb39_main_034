import { useState } from 'react'
import { TodoItemBlock, CheckBox, Text } from './TodolistStyle'
import { Input } from '../../styles/globalStyles'
import { CompleteBtn } from '../Widget/WidgetStyle'
import axios from 'axios'
import { handleAuthErr } from '../Account/TokenAuth'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export const TodoCreate = ({ setTodoData, setOpenCreateChecklist }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [addTodo, setAddTodo] = useState('')
  console.log({ location, plusState })

  const onChange = (e) => {
    setAddTodo(e.target.value)
  }
  const handleClickTodoPost = async (e) => {
    e.preventDefault()
    try {
      await axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + `/v1/goal/${id}`,
        data: {
          title: addTodo,
        },
      })
      await axios({
        method: 'get',
        url: process.env.REACT_APP_API_URL + `/v1/goal/${id}`,
      }).then((res) => {
        setTodoData(res.data.goal.todoList)
        setAddTodo('')
        setOnCreateTodolist(false)
      })
    } catch (err) {
      console.log(err)
      handleAuthErr(dispatch, navigate, err, () => handleClickTodoPost(e))
    }
  }
  const handleClickTodoPostCancle = () => {
    setAddTodo('')
    setOnCreateTodolist(false)
  }
  return (
    <TodoItemBlock>
      <CheckBox />
      <Text>
        <Input
          onChange={onChange}
          value={addTodo}
          placeholder="할 일을 입력하세요"
        />
      </Text>
      <CompleteBtn
        onClick={handleClickTodoPost}
        location="TodoCreate: 작성완료버튼"
        plusState={plusState}
        value="작성완료"
      />
      <CompleteBtn
        onClick={handleClickTodoPostCancle}
        location="TodoCreate: 작성취소 버튼"
        plusState={plusState}
        value="작성취소"
      />
    </TodoItemBlock>
  )
}
