import axios from 'axios'
import { useState } from 'react'
import { CompleteBtn } from '../Widget/WidgetStyle'
import { TodoItemBlock, CheckBox, NewInput } from './TodolistStyle'

function TodoEdit({ todoId, title, done, setOpenEdit }) {
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
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <TodoItemBlock>
      <CheckBox done={done} />
      <NewInput type="text" onChange={onChangeText} value={newTitle}></NewInput>
      <CompleteBtn onClick={handleEditClick}>수정완료</CompleteBtn>
      <CompleteBtn onClick={handleCancleClick}>수정 취소</CompleteBtn>
    </TodoItemBlock>
  )
}
export default TodoEdit
