import {
  ModalBackgroundBlack,
  TimelineModalContainer,
  Wrapper,
  Text,
  TimelineTextarea,
} from './TimelineStyle'
import {
  XBtn,
  AddPicBtn,
  AddEmojiBtn,
  CompleteBtn,
} from '../Widget/WidgetStyle'
import { AiFillCloseSquare } from 'react-icons/ai'
import { Icon } from '../../styles/globalStyles'
import Picker from 'emoji-picker-react'
import { useState } from 'react'

export const TimelineModal = (props) => {
  const { setIsOpen } = props
  const [description, setDescription] = useState('')
  const [openChoseEmoji, setOpenChoseEmoji] = useState(false)

  const HnadleEmoji = () => {
    setOpenChoseEmoji(!openChoseEmoji)
  }
  console.log(description)
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

  const closeTimelineModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <Wrapper>
      {/*최상위에 있는 navigation 포함 black background를 씌어주기 위해 
      globalStyle에서 Wrapper와 ModalBackground 컴포넌트를 추가함*/}
      <ModalBackgroundBlack></ModalBackgroundBlack>
      <TimelineModalContainer>
        {/* --header-- */}
        <div className="header__timeline">
          <Text>2022년 09월 22일</Text>
          <div className="header__timeline--icon"></div>
          <Icon>
            <XBtn onClick={closeTimelineModal}>
              <AiFillCloseSquare size={20} />
            </XBtn>
          </Icon>
        </div>
        <div className="header__editor">
          <Icon>
            <AddPicBtn />
          </Icon>
          <Icon>
            <AddEmojiBtn onClick={HnadleEmoji} />
            {openChoseEmoji ? <Picker onEmojiClick={onEmojiClick} /> : null}
          </Icon>
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
            <CompleteBtn>작성완료</CompleteBtn>
          </div>
        </div>
      </TimelineModalContainer>
    </Wrapper>
  )
}
