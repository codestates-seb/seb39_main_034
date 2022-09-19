import { useState } from 'react'
import data from '../../data/TimelineData'
import { TimelineContainer, Text, Icon } from './TimelineStyle'
import { EditBtn, OpenBtn, CloseBtn } from '../Widget/WidgetStyle'
// import { ModalWrapper } from '../../styles/globalStyles'

export default function Timeline({ onClick }) {
  const [questions] = useState(data)

  return (
    <>
      <TimelineContainer>
        {questions.map((question) => {
          return (
            <TimelineContent
              key={question.id}
              {...question}
              onClick={onClick}
            />
          )
        })}
      </TimelineContainer>
    </>
  )
}

export function TimelineContent({ today, info, onClick }) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <article>
      {/* --header-- */}
      <div className="header__timeline">
        <Text>{today}</Text>
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
        <div className="contents">{showInfo && <p>{info}</p>}</div>
      </div>
    </article>
  )
}
