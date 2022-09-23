import { useState } from 'react'
import moment from 'moment'
import { TimelineContainer, Text } from './TimelineStyle'
import { EditBtn, OpenBtn, CloseBtn } from '../Widget/WidgetStyle'
import { Icon } from '../../styles/globalStyles'

export default function Timeline({ data, onClick }) {
  const length = data.goal.timelineList.length
  return (
    <TimelineContainer>
      {data.goal.timelineList.map((timeline) => {
        return (
          <TimelineContent
            key={timeline.timelineId}
            {...timeline}
            onClick={onClick}
            length={length}
          />
        )
      })}
    </TimelineContainer>
  )
}

export function TimelineContent({ createdAt, description, onClick }) {
  const [showInfo, setShowInfo] = useState(false)
  const today = moment(createdAt).format('YYYY년 MM일 DD일')

  return (
    <article>
      {/* --header-- */}
      <div className="header__timeline">
        <Text>작성일: {today}</Text>
        <div className="header__timeline--icon">
          <Icon>
            <EditBtn size={20} onClick={onClick} />
          </Icon>
          <Icon onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? <CloseBtn size={40} /> : <OpenBtn size={40} />}
          </Icon>
        </div>
      </div>
      {/* --content-- */}
      <div className="contents__timeline">
        <div className="contents">{showInfo && <p>{description}</p>}</div>
      </div>
    </article>
  )
}
