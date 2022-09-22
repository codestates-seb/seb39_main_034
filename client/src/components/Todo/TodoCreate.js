import { useState } from 'react'
import { TodoItemBlock, CheckBox, Text } from './TodolistStyle'
import { Input } from '../../styles/globalStyles'
import { CompleteBtn } from '../Widget/WidgetStyle'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export const TodoCreate = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [addTodo, setAddTodo] = useState('')
  const onChange = (e) => {
    setAddTodo(e.target.value)
  }
  const handleSubmitClick = () => {
    axios({
      method: 'post',
      url: process.env.REACT_APP_API_URL + `/v1/goal/${id}`,
      data: {
        title: addTodo,
      },
    })
      .then((res) => {
        console.log(res)
        navigate(0)
      })
      .catch((err) => {
        console.log(err)
      })
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
      <CompleteBtn type="submit" onClick={handleSubmitClick}>
        작성 완료
      </CompleteBtn>
    </TodoItemBlock>
  )
}
