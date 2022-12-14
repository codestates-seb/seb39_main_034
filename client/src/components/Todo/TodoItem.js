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
        alert('??? ??? ??????')
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
        //??????????????? ??????
        <TodoItemBlock>
          <CheckBox done={complete} onClick={handleClickCheckBox} />
          <NewInput
            type="text"
            onChange={onChangeText}
            value={newTitle}
          ></NewInput>
          <CompleteBtn
            onClick={handleEditClick}
            location="TodoItem: ???????????? ??????"
            editState={onEditTodolist}
            value="????????????"
          />
          <CompleteBtn
            onClick={handleEditClickClose}
            location="TodoItem: ???????????? ??????"
            editState={onEditTodolist}
            value="????????????"
          >
            ?????? ??????
          </CompleteBtn>
        </TodoItemBlock>
      ) : (
        // ?????? ????????? ?????? ??????
        <TodoItemBlock>
          {userName === writer ? (
            <>
              <CheckBox done={complete} onClick={handleClickCheckBox} />
              <Text>{title}</Text>
              <Edit>
                <EditBtn
                  onClick={editChecklistToggle}
                  location="TodoItem(default): ?????? ??????"
                  editState={onEditTodolist}
                />
              </Edit>
              <Remove>
                <DeleteBtn onClick={handleDeleteClick} />
              </Remove>
            </>
          ) : (
            <>
              {/* ???????????? ?????? ?????? ?????? ???????????? */}
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
