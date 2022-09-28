import { TimelineContainer } from './TimelinelistStyle'
import TimelineItem from './TimelineItem'
// import { CloseBtn, OpenBtn } from '../Widget/WidgetStyle'
// import { useState } from 'react'

export default function Timelinelist(props) {
  const { timelineData, onClick, setTimelineData, mode } = props

  // const [isToggle, setIsToggle] = useState(true)
  const limitTimelineData = timelineData.slice(-5)
  // const closeToggle = () => {
  //   setIsToggle(false)
  // }
  // const openToggle = () => {
  //   setIsToggle(!isToggle)
  // }
  return (
    <>
      {mode === 'limit' ? (
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
