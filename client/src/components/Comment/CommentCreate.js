import axios from 'axios'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Picker from 'emoji-picker-react'
// import InputEmoji from 'react-input-emoji'
import {
  CommentCreateContainer,
  CommentInput,
  EmojiPickerBox,
} from './CommentStyle'
import { CompleteBtn, AddEmojiBtn } from '../Widget/WidgetStyle'
import { useDispatch, useSelector } from 'react-redux'
import { handleAuthErr } from '../Account/TokenAuth'

export default function CommentCreate({ goalId, getCommentData }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const [openChoseEmoji, setOpenChoseEmoji] = useState(false) // 이모지 버튼 상태 관리
  const outside = useRef() // 모달 백그라운드 제어. 백그라운드 클릭하면 모달 닫기

  const userName = useSelector((state) => state.auth.userName) // 로그인된 유저

  const handleChangeInput = (e) => {
    setComment(e.target.value)
  }
  // 이모지 버튼 클릭 시 실행
  const handleClickEmoji = () => {
    setOpenChoseEmoji(!openChoseEmoji)
  }
  // 인풋 클릭 시 이모지 모달 닫기
  const handleClickInput = (e) => {
    if (e.target == outside.current) setOpenChoseEmoji(false)
  }

  // 이모지 픽커 클릭 시 실행
  const onEmojiClick = (event, emojiObject) => {
    const inputElement = document.getElementById('input')
    setComment(
      comment.substr(0, inputElement.selectionStart) +
        emojiObject.emoji +
        comment.substr(inputElement.selectionEnd)
    )
  }

  const handleClickSubmit = async () => {
    if (userName === '') {
      alert('로그인이 필요한 기능입니다')
    } else {
      try {
        await axios({
          method: 'post',
          url: process.env.REACT_APP_API_URL + `/v1/goal/${goalId}/comment`,
          data: {
            comment: comment,
          },
        }).then((res) => {
          console.log(res)
          setComment('')
        })
        await getCommentData()
      } catch (err) {
        console.log('ERROR: ', err)
        handleAuthErr(dispatch, navigate, err, handleClickSubmit)
      }
    }
  }

  return (
    <CommentCreateContainer>
      <CommentInput
        type="text"
        id="input"
        value={comment}
        onChange={handleChangeInput}
        onClick={handleClickInput}
        ref={outside}
        autoComplete="off"
        placeholder="코멘트를 달아보세요"
      />
      <AddEmojiBtn onClick={handleClickEmoji} />
      <EmojiPickerBox>
        {openChoseEmoji ? <Picker onEmojiClick={onEmojiClick} /> : null}
      </EmojiPickerBox>
      <CompleteBtn type="submit" value="생성하기" onClick={handleClickSubmit} />
    </CommentCreateContainer>
  )
}
