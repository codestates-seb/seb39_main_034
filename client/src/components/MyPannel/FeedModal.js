import {
  ModalBackgroundBlack,
  TimelineModalContainer,
  Wrapper,
  Text,
} from '../Timeline/TimelinelistStyle'
import { XBtn } from '../Widget/WidgetStyle'
import { AiFillCloseSquare } from 'react-icons/ai'
import { Icon, Col } from '../../styles/globalStyles'
import Feedlist from './Feedlist'

export default function FeedModal({ feedData, setIsOpen }) {
  const closeTimelineModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <Wrapper>
      <Col>
        {' '}
        {/*최상위에 있는 navigation 포함 black background를 씌어주기 위해 
      globalStyle에서 Wrapper와 ModalBackground 컴포넌트를 추가함*/}
        <ModalBackgroundBlack></ModalBackgroundBlack>
        <TimelineModalContainer>
          {/* --header-- */}
          <div className="header__timeline modal">
            <Text>구독중인 피드</Text>
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
              <Feedlist feedData={feedData} />
            </div>
          </div>
        </TimelineModalContainer>
      </Col>
    </Wrapper>
  )
}
