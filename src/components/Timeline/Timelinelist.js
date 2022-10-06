import { TimelineContainer, TimelineReviewContainer } from './TimelinelistStyle'
import TimelineItem from './TimelineItem'
// import { CloseBtn, OpenBtn } from '../Widget/WidgetStyle'
// import { useState } from 'react'

export default function Timelinelist(props) {
  const { timelineData, onClick, setTimelineData, status, mode } = props

  // const [isToggle, setIsToggle] = useState(true)
  const limitTimelineData = timelineData.slice(-5)
  const length = timelineData.length
  console.log('status: ', status)
  // const closeToggle = () => {
  //   setIsToggle(false)
  // }
  // const openToggle = () => {
  //   setIsToggle(!isToggle)
  // }
  return (
    <>
      {status === (1 || 2) ? (
        <TimelineReviewContainer>
          <div className="header__timeline--review">후기 달성 창</div>
          <div className="contents__timeline">인풋창</div>
        </TimelineReviewContainer>
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
    </>
  )
}
