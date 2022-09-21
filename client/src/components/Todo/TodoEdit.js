import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CompleteBtn } from '../Widget/WidgetStyle'
import { TodoItemBlock, CheckBox, NewInput } from './TodolistStyle'

function TodoEdit({ todoId, title, done, setOpenEdit }) {
  const navigate = useNavigate()
  const [newTitle, setNewTitle] = useState(title)

  const handleCancleClick = () => {
    setOpenEdit(false)
  }
  const onChangeText = (e) => {
    setNewTitle(e.target.value)
    // console.log(e.target.value)
  }
  const handleEditClick = () => {
    axios({
      method: 'patch',
      url: process.env.REACT_APP_API_URL + `/v1/todo/${todoId}`,
      data: {
        title: newTitle,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate(0)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <TodoItemBlock>
      <CheckBox done={done} />
      {/* <TodoCheck /> */}
      <NewInput type="text" onChange={onChangeText} value={newTitle}></NewInput>
      <CompleteBtn onClick={handleEditClick}>수정완료</CompleteBtn>
      <CompleteBtn onClick={handleCancleClick}>수정 취소</CompleteBtn>
    </TodoItemBlock>
  )
}
export default TodoEdit
