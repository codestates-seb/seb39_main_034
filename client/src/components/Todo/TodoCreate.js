import { useState } from 'react'
import { TodoItemBlock, CheckBox, Text } from './ChecklistStyle'
import { Input } from '../../styles/globalStyles'
import { CompleteBtn } from '../Widget/WidgetStyle'

export const TodoCreate = () => {
  const [value, setValue] = useState('')
  const onChange = (e) => setValue(e.target.value)

  return (
    <TodoItemBlock>
      <CheckBox />
      <Text>
        <Input
          onChange={onChange}
          value={value}
          placeholder="할 일을 입력하세요"
        />
      </Text>
      <CompleteBtn>작성 완료</CompleteBtn>
    </TodoItemBlock>
  )
}
