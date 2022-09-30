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

function TodoItem({ todoId, title, completed, setTodoData, metaData }) {
  const { id } = useParams()
  const [newTitle, setNewTitle] = useState(title)
  const [complete, setComplete] = useState(completed)
  const [openEdit, setOpenEdit] = useState(false)

  const editChecklistToggle = () => {
    setOpenEdit(!openEdit)
  }

  const handleEditClickClose = () => {
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
        metaData(res.data.metadata)
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleClickCheckBox = () => {
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
        //수정모드인 경우
        <TodoItemBlock>
          <CheckBox done={complete} onClick={handleClickCheckBox} />
          <NewInput
            type="text"
            onChange={onChangeText}
            value={newTitle}
          ></NewInput>
          <CompleteBtn onClick={handleEditClick}>수정완료</CompleteBtn>
          <CompleteBtn onClick={handleEditClickClose}>수정 취소</CompleteBtn>
        </TodoItemBlock>
      ) : (
        // 수정 모드가 아닌 경우
        <TodoItemBlock>
          <CheckBox done={complete} onClick={handleClickCheckBox} />
          <Text>{title}</Text>
          {/* 작성자일 경우: 요청시 헤더에 Authorization: 토큰을 전달해 유효한 토큰을 가지고 있는데 검토 */}
          <Edit>
            <EditBtn onClick={editChecklistToggle} />
          </Edit>
          <Remove>
            <DeleteBtn onClick={handleDeleteClick} />
          </Remove>
          {/* 작성자가 아닐 경우 버튼 안보이게 */}
        </TodoItemBlock>
      )}
    </>
  )
}

export default TodoItem
