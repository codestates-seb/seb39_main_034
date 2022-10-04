import { TimelineContainer, TimelineList, Text } from './TimelinelistStyle'
import TimelineItem from './TimelineItem'
import { HeadingH3 } from '../../styles/globalStyles'
// import { CloseBtn, OpenBtn } from '../Widget/WidgetStyle'
// import { useState } from 'react'

export default function Timelinelist(props) {
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
      {mode === 'limit' ? (
        <HeadingH3 color mt="50px">
          타임라인 ({timelineData.length})
        </HeadingH3>
      ) : null}
      {/*후기: status가 false(진행중)일 때 타임라인만 나오고 true(진행종료)일 경우 후기창 띄움*/}
      <TimelineContainer>
        {status ? (
          <>
            <div className="header__timeline review">
              <Text>후기 달성 창</Text>
            </div>
            <div className="contents__timeline review">
              <div className="contents">인풋창</div>
            </div>
          </>
        ) : length === 0 ? (
          <div className="notice">
            아직 작성된 글이 없어요
            <br />
            함께 힘을 내 볼까요? 🏋️‍♀️🏋️‍♂️
          </div>
        ) : mode === 'limit' ? (
          <>
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
          </>
        ) : (
          <>
            {timelineData.map((timeline) => {
              return (
                <TimelineItem
                  key={timeline.timelineId}
                  {...timeline}
                  onClick={onClick}
                />
              )
            })}
          </>
        )}
      </TimelineContainer>
    </TimelineList>
  )
}
