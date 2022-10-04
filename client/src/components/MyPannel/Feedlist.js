import { TimelineContainer, TimelineList } from '../Timeline/TimelinelistStyle'
import FeedItem from './FeedItem'
// import { HeadingH3 } from '../../styles/globalStyles'
// import { CloseBtn, OpenBtn } from '../Widget/WidgetStyle'
// import { useState } from 'react'

export default function Feedlist({ feedData, mode }) {
  // const [isToggle, setIsToggle] = useState(true)
  const limitedFeedData = feedData.slice(-5)
  console.log('현재모드', mode)
  console.log('현재 데이터', feedData)
  return (
    <TimelineList>
      <TimelineContainer>
        {feedData.length === 0 ? (
          <div className="notice">
            아직 업데이트 된 글이 없어요
            <br />
            함께 힘을 내 볼까요? 🏋️‍♀️🏋️‍♂️
          </div>
        ) : mode === 'limit' ? (
          <>
            {limitedFeedData.map((feed) => {
              return (
                <FeedItem
                  key={'feed' + feed.feedId}
                  goalId={feed.goalId}
                  member={'지금 limited' + feed.timeline.member}
                  description={feed.timeline.description}
                  createdAt={feed.timeline.createdAt}
                  image={feed.timeline.image}
                />
              )
            })}
          </>
        ) : (
          <>
            {feedData.map((feed) => {
              return (
                <FeedItem
                  key={feed.feedId}
                  goalId={feed.goalId}
                  member={feed.member}
                  description={feed.timeline.description}
                  createdAt={feed.timeline.createdAt}
                  image={feed.timeline.image}
                />
              )
            })}
          </>
        )}
      </TimelineContainer>
    </TimelineList>
  )
}
