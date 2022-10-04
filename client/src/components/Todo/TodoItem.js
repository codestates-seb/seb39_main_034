import axios from 'axios'
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleAuthErr } from '../Account/TokenAuth'
import {
  TodoItemBlock,
  Text,
  Remove,
  Edit,
  CheckBox,
  NewInput,
} from './TodolistStyle'
import { EditBtn, DeleteBtn, CompleteBtn } from '../Widget/WidgetStyle'
// import TodoEdit from './TodoEdit'
// import TodoCheck from './TodoCheck'

function TodoItem({
  todoId,
  title,
  completed,
  writer,
  getTodoData,
  getMetaData,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [newTitle, setNewTitle] = useState(title)
  const [complete, setComplete] = useState(completed)
  const [onEditTodolist, setOnEditTodolist] = useState(false)

  const userName = useSelector((state) => state.auth.userName)
  // console.log({ location })

  const editChecklistToggle = useCallback(() => {
    setOnEditTodolist(!onEditTodolist)
  }, [onEditTodolist])

  const handleEditClickClose = () => {
    setOnEditTodolist(false)
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
      }).then(setOnEditTodolist(!onEditTodolist))
      await getTodoData()
    } catch (err) {
      console.log(err)
      handleAuthErr(dispatch, navigate, err, handleEditClick)
    }
  }

  const handleClickCheckBox = async () => {
    if (complete) {
      try {
        await axios.get(`/v1/todo/cancel/${todoId}`).then((res) => {
          console.log(res)
          setComplete(!complete)
        })
        await getMetaData()
      } catch (err) {
        console.log(err)
        handleAuthErr(dispatch, navigate, err, handleClickCheckBox)
      }
    } else {
      try {
        await axios.get(`/v1/todo/${todoId}`).then((res) => {
          console.log(res)
          setComplete(!complete)
        })
        await getMetaData()
      } catch (err) {
        console.log(err)
        handleAuthErr(dispatch, navigate, err, handleClickCheckBox)
      }
    }
  }
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/v1/todo/${todoId}`).then((res) => {
        console.log(res)
        alert('할 일 삭제')
      })
      await getTodoData()
    } catch (err) {
      console.log(err)
      handleAuthErr(dispatch, navigate, err, handleDeleteClick)
    }
  }
  return (
    <>
      {onEditTodolist ? (
        //수정모드인 경우
        <TodoItemBlock>
          <CheckBox done={complete} onClick={handleClickCheckBox} />
          <NewInput
            type="text"
            onChange={onChangeText}
            value={newTitle}
          ></NewInput>
          <CompleteBtn
            onClick={handleEditClick}
            location="TodoItem: 수정완료 버튼"
            editState={onEditTodolist}
            value="수정완료"
          />
          <CompleteBtn
            onClick={handleEditClickClose}
            location="TodoItem: 수정취소 버튼"
            editState={onEditTodolist}
            value="수정취소"
          >
            수정 취소
          </CompleteBtn>
        </TodoItemBlock>
      ) : (
        // 수정 모드가 아닌 경우
        <TodoItemBlock>
          {userName === writer ? (
            <>
              <CheckBox done={complete} onClick={handleClickCheckBox} />
              <Text>{title}</Text>
              <Edit>
                <EditBtn
                  onClick={editChecklistToggle}
                  location="TodoItem(default): 수정 버튼"
                  editState={onEditTodolist}
                />
              </Edit>
              <Remove>
                <DeleteBtn onClick={handleDeleteClick} />
              </Remove>
            </>
          ) : (
            <>
              {/* 작성자가 아닐 경우 버튼 안보이게 */}
              <CheckBox done={complete} />
              <Text>{title}</Text>
            </>
          )}
        </TodoItemBlock>
      )}
    </>
  )
}

export default TodoItem
