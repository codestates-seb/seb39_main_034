import React from 'react'
import { TodoItemBlock, CheckBox, Text, Remove, Edit } from './ChecklistStyle'
import { DeleteBtn, EditBtn } from '../Widget/WidgetStyle'

function TodoItem({ title, done }) {
  return (
    <TodoItemBlock>
      <CheckBox done={done} />
      <Text>{title}</Text>
      <Edit>
        <EditBtn />
      </Edit>
      <Remove>
        <DeleteBtn />
      </Remove>
    </TodoItemBlock>
  )
}

export default React.memo(TodoItem)
