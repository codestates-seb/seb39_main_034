import React from 'react'
import { TodoItemBlock, CheckBox, Text, Remove, Edit } from './TodolistStyle'
import TodoDelete from './TodoDelete'
import TodoEdit from './TodoEdit'
// import TodoCheck from './Todolist'

function TodoItem({ todoId, title, done }) {
  return (
    <TodoItemBlock>
      <CheckBox done={done} />
      {/* <TodoCheck /> */}
      <Text>{title}</Text>
      <Edit>
        <TodoEdit todoId={todoId} title={title} />
      </Edit>
      <Remove>
        <TodoDelete todoId={todoId} title={title} />
      </Remove>
    </TodoItemBlock>
  )
}

export default React.memo(TodoItem)
