import {
  ModalBackgroundBlack,
  TimelineModalContainer,
  Wrapper,
  Text,
} from './TimelinelistStyle'
import { XBtn } from '../Widget/WidgetStyle'
import { AiFillCloseSquare } from 'react-icons/ai'
import { Icon } from '../../styles/globalStyles'
import Timelinelist from './Timelinelist'

export const TimelineModal = (props) => {
  const { data, onClick, setIsOpen } = props

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
          <Text>조안나(joAnna) 님의 타임라인</Text>
          <div className="header__timeline--icon"></div>
          <Icon>
            <XBtn onClick={closeTimelineModal}>
              <AiFillCloseSquare size={20} />
            </XBtn>
          </Icon>
        </div>
        {/* --content-- */}
        <div className="contents__timeline">
          <div className="contents">
            <Timelinelist data={data} onClick={onClick} />
          </div>
        </div>
      </TimelineModalContainer>
    </Wrapper>
  )
}
