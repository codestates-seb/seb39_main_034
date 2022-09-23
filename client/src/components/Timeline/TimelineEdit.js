import { useState } from 'react'
import axios from 'axios'
import { CompleteBtn, AddEmojiBtn, AddPicBtn } from '../Widget/WidgetStyle'
import { TimelineTextarea, EmojiPickerBox } from './TimelinelistStyle'
import { Icon } from '../../styles/globalStyles'
import Picker from 'emoji-picker-react'

export default function Edit({ timelineId, description, setOpenEdit }) {
  const [newDdescription, setNewDescription] = useState(description)
  const [openChoseEmoji, setOpenChoseEmoji] = useState(false)

  const handleEditClick = () => {
    axios({
      method: 'patch',
      url: process.env.REACT_APP_API_URL + `/v1/goal/timeline/${timelineId}`,
      data: {
        description: newDdescription,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleCancleClick = () => {
    setOpenEdit(false)
  }

  const handleTextarea = (e) => {
    setNewDescription(e.target.value)
  }
  const HnadleEmoji = () => {
    setOpenChoseEmoji(!openChoseEmoji)
  }
  const onEmojiClick = (event, emojiObject) => {
    const textAreaElement = document.getElementById('text-area')
    setNewDescription(
      newDdescription.substr(0, textAreaElement.selectionStart) +
        emojiObject.emoji +
        newDdescription.substr(textAreaElement.selectionEnd)
    )
  }

  return (
    <>
      <div className="header__create-timeline--icon">
        <Icon>
          <AddPicBtn />
        </Icon>
        <Icon>
          <AddEmojiBtn onClick={HnadleEmoji} />
          <EmojiPickerBox>
            {openChoseEmoji ? <Picker onEmojiClick={onEmojiClick} /> : null}
          </EmojiPickerBox>
        </Icon>
      </div>
      <div className="contents__timeline">
        <div className="contents">
          <TimelineTextarea
            id="text-area"
            value={newDdescription}
            onChange={handleTextarea}
          />
          <CompleteBtn onClick={handleEditClick}>수정완료</CompleteBtn>
          <CompleteBtn onClick={handleCancleClick}>수정취소</CompleteBtn>
        </div>
      </div>
    </>
  )
}
