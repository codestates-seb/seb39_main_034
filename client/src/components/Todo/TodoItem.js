import React from 'react'
import { MdDone, MdDelete } from 'react-icons/md'
import { FaPen } from 'react-icons/fa'
// import data from '../../data/TodoData'
import {
  TodoItemBlock,
  CheckCircle,
  Text,
  Remove,
  Edit,
} from './ChecklistStyle'

function TodoItem() {
  return (
    <TodoItemBlock>
      <CheckCircle>
        <MdDone />
      </CheckCircle>
      <Text>1주차: 전통시장에서 장보기</Text>
      <Edit>
        <FaPen />
      </Edit>
      <Remove>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  )
}

export default React.memo(TodoItem)
