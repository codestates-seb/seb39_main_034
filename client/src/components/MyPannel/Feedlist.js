import {
  TimelineContainer,
  TimelineList,
  Text,
} from '../Timeline/TimelinelistStyle'
import TimelineItem from './FeedItem'
// import { HeadingH3 } from '../../styles/globalStyles'
// import { CloseBtn, OpenBtn } from '../Widget/WidgetStyle'
// import { useState } from 'react'

export default function Feedlist(props) {
  const { timelineData, onClick, setTimelineData, status, mode } = props

  // const [isToggle, setIsToggle] = useState(true)
  const limitTimelineData = timelineData.slice(-5)
  const length = timelineData.length
  // console.log('status: ', status)
  // const closeToggle = () => {
  //   setIsToggle(false)
  // }
  // const openToggle = () => {
  //   setIsToggle(!isToggle)
  // }
  return (
    <TimelineList>
      <div>제목이랑 작성자명은 하드코딩</div>
      <div>
        Feeditem 폴더에서 각 아이템마다 feedtitle을 달아줬어요. 잘못 복붙했는지
        더보기 기능은 안되네영..
      </div>
      {/* <HeadingH3 color mt="50px">
        타임라인
      </HeadingH3> */}
      {/*후기: status가 false(진행중)일 때 타임라인만 나오고 true(진행종료)일 경우 후기창 띄움*/}
      {status ? (
        <TimelineContainer>
          <div className="header__timeline review">
            <Text>후기 달성 창</Text>
          </div>
          <div className="contents__timeline review">
            <div className="contents">인풋창</div>
          </div>
        </TimelineContainer>
      ) : length === 0 ? (
        <div>아직 데이터가 없습니다</div>
      ) : mode === 'limit' ? (
        <TimelineContainer>
          {limitTimelineData.map((timeline) => {
            return (
              <TimelineItem
                key={timeline.timelineId}
                {...timeline}
                setTimelineData={setTimelineData}
                onClick={onClick}
              />
            )
          })}
        </TimelineContainer>
      ) : (
        <TimelineContainer>
          {timelineData.map((timeline) => {
            return (
              <TimelineItem
                key={timeline.timelineId}
                {...timeline}
                onClick={onClick}
              />
            )
          })}
        </TimelineContainer>
      )}
    </TimelineList>
  )
}
