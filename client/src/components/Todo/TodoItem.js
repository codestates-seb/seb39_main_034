import React, { useState } from 'react'
import { TodoItemBlock, Text, Remove, Edit } from './TodolistStyle'
import { EditBtn } from '../Widget/WidgetStyle'
import TodoDelete from './TodoDelete'
import TodoEdit from './TodoEdit'
import TodoCheck from './TodoCheck'

function TodoItem({ todoId, title, done }) {
  const [openEdit, setOpenEdit] = useState(false)

  const editChecklistToggle = () => {
    setOpenEdit(!openEdit)
  }

  return (
    <>
      {openEdit ? (
        <TodoEdit
          todoId={todoId}
          title={title}
          done={done}
          setOpenEdit={setOpenEdit}
        />
      ) : (
        <TodoItemBlock>
          <TodoCheck todoId={todoId} done={done} />
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

export default React.memo(TodoItem)
