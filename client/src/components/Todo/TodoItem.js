import axios from 'axios'
import { useState } from 'react'
import {
  TodoItemBlock,
  Text,
  Remove,
  Edit,
  CheckBox,
  NewInput,
} from './TodolistStyle'
import { EditBtn, CompleteBtn } from '../Widget/WidgetStyle'
import TodoDelete from './TodoDelete'
// import TodoEdit from './TodoEdit'
import TodoCheck from './TodoCheck'

function TodoItem({ todoId, title, completed }) {
  const [openEdit, setOpenEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  const editChecklistToggle = () => {
    setOpenEdit(!openEdit)
  }
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
    <>
      {openEdit ? (
        <TodoItemBlock>
          <CheckBox done={completed} />
          <NewInput
            type="text"
            onChange={onChangeText}
            value={newTitle}
          ></NewInput>
          <CompleteBtn onClick={handleEditClick}>수정완료</CompleteBtn>
          <CompleteBtn onClick={handleCancleClick}>수정 취소</CompleteBtn>
        </TodoItemBlock>
      ) : (
        <TodoItemBlock>
          <TodoCheck todoId={todoId} done={completed} />
          <Text>{title}</Text>
          <Edit>
            <EditBtn onClick={editChecklistToggle} />
          </Edit>
          <Remove>
            <TodoDelete todoId={todoId} title={title} />
          </Remove>
        </TodoItemBlock>
      )}
    </>
  )
}

export default TodoItem
