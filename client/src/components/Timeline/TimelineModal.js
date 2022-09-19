import {
  ModalBackgroundBlack,
  TimelineModalContainer,
  Wrapper,
  Text,
  Icon,
  TimelineTextarea,
} from './TimelineStyle'
import {
  XBtn,
  AddPicBtn,
  AddEmojiBtn,
  CompleteBtn,
} from '../Widget/WidgetStyle'
import { AiFillCloseSquare } from 'react-icons/ai'

export const TimelineModal = (props) => {
  const { setIsOpen } = props
  const closeTimelineModal = () => {
    setIsOpen(false)
  }
  return (
    <Wrapper>
      {/*최상위에 있는 navigation 포함 black background를 씌어주기 위해 
      globalStyle에서 Wrapper와 ModalBackground 컴포넌트를 추가함*/}
      <ModalBackgroundBlack></ModalBackgroundBlack>
      <TimelineModalContainer>
        {/* --header-- */}
        <div className="header__timeline">
          <Text>2022년 9월 19일(월)</Text>
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
            <AddEmojiBtn />
          </Icon>
        </div>
        {/* --content-- */}
        <div className="contents__timeline">
          <div className="contents">
            <TimelineTextarea />
          </div>
          <div className="button__complete">
            <CompleteBtn>작성완료</CompleteBtn>
          </div>
        </div>
      </TimelineModalContainer>
    </Wrapper>
  )
}
