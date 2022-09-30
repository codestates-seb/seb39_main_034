import { useState } from 'react'
import data from '../../data/CommentData'
import CommentCreate from './CommentCreate'
import { CommentContainer } from './CommentStyle'

export default function Comment() {
  const [comments] = useState(data)

  return (
    <CommentContainer>
      <CommentCreate />
      {comments.map((comment) => {
        return <CommentContent key={comment.commentId} {...comment} />
      })}
    </CommentContainer>
  )
}

export function CommentContent({ comment, userName }) {
  return (
    <article>
      <h4>{userName}</h4>
      <p>{comment}</p>
    </article>
  )
}