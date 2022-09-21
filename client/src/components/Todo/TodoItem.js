import React from 'react'

import { TodoItemBlock, CheckBox, Text, Remove, Edit } from './TodolistStyle'
import { DeleteBtn, EditBtn } from '../Widget/WidgetStyle'

function handleClick() {
  alert('deleted!')
}

function TodoItem({ title, done }) {
  return (
    <TodoItemBlock>
      <CheckBox done={done} />
      <Text>{title}</Text>
      <Edit>
        <EditBtn onClick={handleClick} />
      </Edit>
      <Remove>
        <DeleteBtn onClick={handleClick} />
      </Remove>
    </TodoItemBlock>
  )
}

export default React.memo(TodoItem)
