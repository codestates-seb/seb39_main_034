import { useState } from 'react'
import data from '../../data/TimelineData'
import { FaCaretDown, FaCaretUp, FaPen } from 'react-icons/fa'
import { TimelineContainer, Text, Icon } from './TimelineStyle'

export default function Timeline() {
  const [questions] = useState(data)

  return (
    <TimelineContainer>
      {questions.map((question) => {
        return <TimelineContent key={question.id} {...question} />
      })}
    </TimelineContainer>
  )
}

export function TimelineContent({ today, info }) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <article>
      {/* --header-- */}
      <div className="header__timeline">
        <Text>{today}</Text>
        <div className="header__timeline--icon">
          <Icon>
            <FaPen size={20} />
          </Icon>
          <Icon onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? <FaCaretUp size={40} /> : <FaCaretDown size={40} />}
          </Icon>
        </div>
      </div>
      {/* --content-- */}
      <div className="contents__timeline">
        <div className="contents">{showInfo && <p>{info}</p>}</div>
      </div>
    </article>
  )
}
