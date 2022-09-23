import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import {
  TimelineContainer,
  TimelineTextarea,
  EmojiPickerBox,
  Text,
} from './TimelinelistStyle'
import { CompleteBtn, AddPicBtn, AddEmojiBtn } from '../Widget/WidgetStyle'
import { Icon } from '../../styles/globalStyles'
import Picker from 'emoji-picker-react'

export default function TimelineCreate({ createdAt }) {
  const { id } = useParams()
  const today = moment(createdAt).format('YYYY년 MM일 DD일')

  const [description, setDescription] = useState('')
  const [openChoseEmoji, setOpenChoseEmoji] = useState(false)

  const handleSubmitClick = () => {
    axios({
      method: 'post',
      url: process.env.REACT_APP_API_URL + `/v1/goal/${id}/timeline`,
      data: {
        description: description,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const HnadleEmoji = () => {
    setOpenChoseEmoji(!openChoseEmoji)
  }

  const handleTextarea = (e) => {
    setDescription(e.target.value)
  }

  const onEmojiClick = (event, emojiObject) => {
    const textAreaElement = document.getElementById('text-area')
    setDescription(
      description.substr(0, textAreaElement.selectionStart) +
        emojiObject.emoji +
        description.substr(textAreaElement.selectionEnd)
    )
  }

  return (
    <TimelineContainer>
      <article>
        {/* --header-- */}
        <div className="header__timeline">
          <Text>작성일: {today} </Text>
          <div className="header__timeline--icon">
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
        </div>
        {/* --content-- */}
        <div className="contents__timeline">
          <div className="contents">
            <TimelineTextarea
              id="text-area"
              value={description}
              onChange={handleTextarea}
            />
          </div>
          <div className="button__complete">
            <CompleteBtn type="submit" onClick={handleSubmitClick}>
              작성완료
            </CompleteBtn>
          </div>
        </div>
      </article>
    </TimelineContainer>
  )
}
