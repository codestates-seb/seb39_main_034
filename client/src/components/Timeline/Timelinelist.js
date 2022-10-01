import { TimelineContainer, TimelineList, Text } from './TimelinelistStyle'
import TimelineItem from './TimelineItem'
import { HeadingH3 } from '../../styles/globalStyles'
// import { CloseBtn, OpenBtn } from '../Widget/WidgetStyle'
// import { useState } from 'react'

export default function Timelinelist(props) {
  const { timelineData, setTimelineData, status, mode } = props

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
      <HeadingH3 mt="50px">타임라인</HeadingH3>
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
              />
            )
          })}
        </TimelineContainer>
      ) : (
        <TimelineContainer>
          {timelineData.map((timeline) => {
            return <TimelineItem key={timeline.timelineId} {...timeline} />
          })}
        </TimelineContainer>
      )}
    </TimelineList>
  )
}
