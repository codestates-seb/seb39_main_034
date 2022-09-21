import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CompleteBtn, EditBtn } from '../Widget/WidgetStyle'
import { NewInput, NewTodoItemBlock } from './TodolistStyle'

function TodoEdit({ todoId, title }) {
  const navigate = useNavigate()
  const [openEdit, setOpenEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const editChecklistToggle = () => {
    setOpenEdit(!openEdit)
  }
  const onChangeText = (e) => {
    setNewTitle(e.target.value)
    // console.log(e.target.value)
  }
  function handleEditClick() {
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
          //   console.log('수정: ', res)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      todoId: {todoId}
      <EditBtn onClick={editChecklistToggle} />
      {openEdit ? (
        <NewTodoItemBlock>
          <NewInput type="text" onChange={onChangeText} value={newTitle} />
          <CompleteBtn onClick={handleEditClick}>수정완료</CompleteBtn>
        </NewTodoItemBlock>
      ) : null}
    </>
  )
}

// function TodoEditChecklist({ todoId, title }) {
//   const onChange = (e) => {
//     console.log(e)
//   }
//   function handleEditClick() {
//     axios({
//       method: 'patch',
//       url: process.env.REACT_APP_API_URL + `/v1/todo/${todoId}`,
//       data: {
//         title: title,
//       },
//     })
//       .then((res) => {
//         console.log(res)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }
//   return (
//     <EditTodoItemBlock>
//       <CheckBox />
//       <Text>
//         <Input
//           onChange={onChange}
//           value={title}
//           placeholder="할 일을 입력하세요"
//         />
//       </Text>
//       <CompleteBtn type="submit" onClick={handleEditClick}>
//         작성 완료
//       </CompleteBtn>
//     </EditTodoItemBlock>
//   )
// }
export default TodoEdit
