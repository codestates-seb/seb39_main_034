import { useState } from 'react'
import { TodoItemBlock, CheckBox, Text } from './TodolistStyle'
import { Input } from '../../styles/globalStyles'
import { CompleteBtn } from '../Widget/WidgetStyle'
import axios from 'axios'
import { handleAuthErr } from '../Account/TokenAuth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export const TodoCreate = ({ setOnCreateTodolist, getTodoData, goalId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [addTodo, setAddTodo] = useState('')

  const onChange = (e) => {
    setAddTodo(e.target.value)
  }
  const handleClickTodoPost = async (e) => {
    e.preventDefault()
    try {
      await axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + `/v1/goal/${goalId}`,
        data: {
          title: addTodo,
        },
      }).then(() => {
        setAddTodo('')
        setOnCreateTodolist(false)
      })
      await getTodoData()
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
      <CompleteBtn onClick={handleClickTodoPost} value="작성완료" />
      <CompleteBtn onClick={handleClickTodoPostCancle} value="작성취소" />
    </TodoItemBlock>
  )
}
