import React from 'react'
// import data from '../../data/TodoData'
import {
  TodoItemBlock,
  CheckCircle,
  Text,
  Remove,
  Edit,
} from './ChecklistStyle'
import { DeleteBtn, EditBtn } from '../Widget/WidgetStyle'

function TodoItem() {
  return (
    <TodoItemBlock>
      <CheckCircle>check</CheckCircle>
      <Text>1주차: 전통시장에서 장보기</Text>
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
