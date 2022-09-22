import { CommentCreateContainer } from './CommentStyle'
import { Input } from '../../styles/globalStyles'
import { CompleteBtn } from '../Widget/WidgetStyle'

export default function CommentCreate() {
  return (
    <CommentCreateContainer>
      <Input placeholder="텍스트 댓글" />
      <CompleteBtn type="submit">생성하기</CompleteBtn>
    </CommentCreateContainer>
  )
}
