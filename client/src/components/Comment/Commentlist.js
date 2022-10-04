// import { useState } from 'react'
// import data from '../../data/CommentData'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommentCreate from './CommentCreate'
import moment from 'moment'
import { HeadingH3 } from '../../styles/globalStyles'
import { CompleteBtn, DeleteBtn, EditBtn } from '../Widget/WidgetStyle'
import { CommentContainer, NewInput } from './CommentStyle'
import axios from 'axios'
import { handleAuthErr } from '../Account/TokenAuth'
import { useDispatch } from 'react-redux'

export default function Commentlist({ goalId, commentData, getCommentData }) {
  const reverseData = commentData.reverse()
  return (
    <CommentContainer>
      <HeadingH3>코멘트</HeadingH3>
      <CommentCreate goalId={goalId} getCommentData={getCommentData} />
      {reverseData.map((comment) => {
        return (
          <CommentItem
            key={comment.commentId}
            {...comment}
            getCommentData={getCommentData}
          />
        )
      })}
    </CommentContainer>
  )
}

export function CommentItem({
  commentId,
  comment,
  createdAt,
  member,
  getCommentData,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [onEditComment, setOnEditComment] = useState(false)
  const [newComment, setNewComment] = useState(comment)
  const handleChangeInput = (e) => {
    setNewComment(e.target.value)
  }
  const editCommnetToggle = () => {
    setOnEditComment(!onEditComment)
  }
  const editCommnetCancle = () => {
    setOnEditComment(!onEditComment)
  }

  // 수정 버튼 클릭 시 실행
  const handleEditClick = async () => {
    try {
      await axios({
        method: 'patch',
        url: process.env.REACT_APP_API_URL + `/v1/goal/comment/${commentId}`,
        data: {
          comment: newComment,
        },
      }).then(setOnEditComment(!onEditComment))
      await getCommentData()
    } catch (err) {
      console.log(err)
      handleAuthErr(dispatch, navigate, err, handleEditClick)
    }
  }

  // 삭제 버튼 클릭 시 실행
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/v1/goal/comment/${commentId}`)
      await getCommentData()
    } catch (err) {
      console.log(err)
      handleAuthErr(dispatch, navigate, err, handleDeleteClick)
    }
  }

  return (
    <article>
      {onEditComment ? (
        <>
          <div className="comment edit">
            <div className="img"></div>
            <div className="info">
              <h4>{member}</h4>
              <span className="dot">·</span>
              <span>{moment(createdAt).format('YYYY-MM-DD')}</span>
              <NewInput
                type="text"
                value={newComment}
                onChange={handleChangeInput}
              ></NewInput>
            </div>
          </div>
          <div className="button__complete">
            <CompleteBtn onClick={handleEditClick} value="수정완료" />
            <CompleteBtn onClick={editCommnetCancle} value="수정취소" />
          </div>
        </>
      ) : (
        <>
          <div className="comment">
            <div className="img"></div>
            <div className="info">
              <h4>{member}</h4>
              <span className="dot">·</span>
              <span>{moment(createdAt).format('YYYY-MM-DD')}</span>
              <p>{comment}</p>
            </div>
          </div>
          <div className="button__complete">
            <EditBtn onClick={editCommnetToggle} />
            <DeleteBtn onClick={handleDeleteClick} />
          </div>
        </>
      )}
    </article>
  )
}
