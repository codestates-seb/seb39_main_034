import { TimelineContainer } from './TimelinelistStyle'
import TimelineItem from './TimelineItem'
import { CloseBtn, OpenBtn } from '../Widget/WidgetStyle'
import { useState } from 'react'

export default function Timeline({ data, onClick }) {
  const [isToggle, setIsToggle] = useState(true)
  const closeToggle = () => {
    setIsToggle(false)
  }
  const openToggle = () => {
    setIsToggle(!isToggle)
  }
  return (
    <TimelineContainer>
      {isToggle ? (
        <>
          <div className="header__timeline2">
            <h3>Today</h3>
            <OpenBtn onClick={closeToggle} />
          </div>
          {data.goal.timelineList.map((timeline) => {
            return (
              <TimelineItem
                key={timeline.timelineId}
                timelineId={timeline.timelineId}
                {...timeline}
                onClick={onClick}
              />
            )
          })}
        </>
      ) : (
        <div className="header__timeline2">
          <h3>Today</h3>
          <CloseBtn onClick={openToggle} />
        </div>
      )}
    </TimelineContainer>
  )
}
