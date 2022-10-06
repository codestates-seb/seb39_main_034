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
import { EditBtn, DeleteBtn, CompleteBtn } from '../Widget/WidgetStyle'
import { useParams } from 'react-router-dom'
// import TodoEdit from './TodoEdit'
// import TodoCheck from './TodoCheck'

function TodoItem({ todoId, title, completed, setTodoData }) {
  const { id } = useParams()
  const [newTitle, setNewTitle] = useState(title)
  const [complete, setComplete] = useState(completed)
  const [openEdit, setOpenEdit] = useState(false)

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
  const handleEditClick = async () => {
    try {
      await axios({
        method: 'patch',
        url: process.env.REACT_APP_API_URL + `/v1/todo/${todoId}`,
        data: {
          title: newTitle,
        },
      })
      await axios({
        method: 'get',
        url: process.env.REACT_APP_API_URL + `/v1/goal/${id}`,
      }).then((res) => {
        setTodoData(res.data.goal.todoList)
        setOpenEdit(!openEdit)
      })
    } catch (err) {
      console.log(err)
    }
  }
  const clickCheckBox = () => {
    if (complete) {
      axios({
        method: 'get',
        url: process.env.REACT_APP_API_URL + `/v1/todo/cancel/${todoId}`,
      })
        .then((res) => {
          console.log(res)
          setComplete(!complete)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios({
        method: 'get',
        url: process.env.REACT_APP_API_URL + `/v1/todo/${todoId}`,
      })
        .then((res) => {
          console.log(res)
          setComplete(!complete)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const handleDeleteClick = async () => {
    try {
      await axios({
        method: 'delete',
        url: process.env.REACT_APP_API_URL + `/v1/todo/${todoId}`,
      }).then((res) => {
        console.log(res)
        alert('할 일 삭제')
      })
      await axios({
        method: 'get',
        url: process.env.REACT_APP_API_URL + `/v1/goal/${id}`,
      }).then((res) => {
        setTodoData(res.data.goal.todoList)
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {openEdit ? (
        <TodoItemBlock>
          <CheckBox done={complete} onClick={clickCheckBox} />
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
          <CheckBox done={complete} onClick={clickCheckBox} />
          <Text>{title}</Text>
          <Edit>
            <EditBtn onClick={editChecklistToggle} />
          </Edit>
          <Remove>
            <DeleteBtn onClick={handleDeleteClick} />
          </Remove>
        </TodoItemBlock>
      )}
    </>
  )
}

export default TodoItem
