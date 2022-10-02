import {
  TimelineContainer,
  TimelineList,
  TimelineTextarea,
  Text,
} from './TimelinelistStyle'
import TimelineItem from './TimelineItem'
import { HeadingH3 } from '../../styles/globalStyles'
import { useState, useCallback } from 'react'
import { MoreBtn, CompleteBtn } from '../Widget/WidgetStyle'
import { TimelineModal } from './TimelineModal'
// import { CloseBtn, OpenBtn } from '../Widget/WidgetStyle'
// import { useState } from 'react'

export default function Timelinelist(props) {
  const { timelineData, setTimelineData, writer, status, mode } = props
  const [onTimelineModal, setOnTimelineModal] = useState(false) // 타임라인 모달(더보기) 상태
  const limitTimelineData = timelineData.slice(-5)
  const length = timelineData.length

  const openTimelineModal = useCallback(() => {
    setOnTimelineModal(!onTimelineModal)
    document.body.style.overflow = 'hidden'
  })

  return (
    <TimelineList>
      <HeadingH3 mt="50px">타임라인</HeadingH3>
      {/*목표 진행 종료일 경우 후기 작성 창 띄움*/}
      {status === 1 ? (
        <TimelineContainer>
          <div className="header__timeline review">
            <Text>후기 달성 창</Text>
          </div>
          <div className="contents__timeline review">
            <div className="contents">
              <TimelineTextarea placeholder="후기 내용을 입력하세요!" />
              <div className="button__complete">
                <CompleteBtn value="작성완료" />
                <CompleteBtn value="나중에 작성" />
              </div>
            </div>
          </div>
        </TimelineContainer>
      ) : null}

      {length === 0 ? (
        //타임라인 데이터가 없을 경우
        <div>아직 데이터가 없습니다</div>
      ) : //타임라인 데이터가 있을 경우
      mode === 'limit' ? (
        <>
          <TimelineContainer>
            {/* 후기 타임라인이 있다면 타임라인 상단에 보여주기 */}
            {limitTimelineData.map((timeline) => {
              return (
                <TimelineItem
                  key={timeline.timelineId}
                  {...timeline}
                  setTimelineData={setTimelineData}
                  writer={writer}
                />
              )
            })}
          </TimelineContainer>
          <MoreBtn onClick={openTimelineModal}></MoreBtn>
        </>
      ) : (
        <>
          <TimelineContainer>
            {/* 모달 내부에서: 후기 타임라인이 있다면 타임라인 상단에 보여주기 */}
            {timelineData.map((timeline) => {
              return (
                <TimelineItem
                  key={timeline.timelineId}
                  {...timeline}
                  writer={writer}
                />
              )
            })}
          </TimelineContainer>
          <MoreBtn onClick={openTimelineModal}></MoreBtn>
        </>
      )}
      {onTimelineModal && (
        <TimelineModal
          timelineData={timelineData}
          setOnTimelineModal={setOnTimelineModal}
        />
      )}
    </TimelineList>
  )
}
