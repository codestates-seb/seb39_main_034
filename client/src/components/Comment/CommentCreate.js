import { CommentCreateContainer } from './CommentStyle'
// import { Input } from '../../styles/globalStyles'
import { CompleteBtn } from '../Widget/WidgetStyle'
import InputEmoji from 'react-input-emoji'
import { useState } from 'react'

export default function CommentCreate() {
  const [text, setText] = useState('')
  return (
    <CommentCreateContainer>
      <InputEmoji value={text} onChange={setText} placeholder="텍스트 댓글" />
      {/* <Input placeholder="텍스트 댓글" /> */}
      <CompleteBtn type="submit">생성하기</CompleteBtn>
    </CommentCreateContainer>
  )
}
