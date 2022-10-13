import { TimelineContainer, TimelineList } from '../Timeline/TimelinelistStyle'
import FeedItem from './FeedItem'
// import { HeadingH3 } from '../../styles/globalStyles'
// import { CloseBtn, OpenBtn } from '../Widget/WidgetStyle'
// import { useState } from 'react'

export default function Feedlist({ feedData, mode }) {
  // const [isToggle, setIsToggle] = useState(true)
  const limitedFeedData = feedData.slice(-5)
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
                  title={feed.goalTitle}
                  member={feed.timeline.member}
                  profile={
                    feed.timeline.member === 'joanna'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member2.jpeg'
                      : feed.timeline.member === 'sol-namoo'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member1.jpg'
                      : feed.timeline.member === 'jaeyoungkim'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member3.png'
                      : feed.timeline.member === 'AhnHyungJoon'
                      ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member4.png'
                      : 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png'
                  }
                  description={feed.timeline.description}
                  createdAt={feed.timeline.createdAt}
                  image={feed.timeline.image}
                  isFinal={feed.timeline.finalTimeline}
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
                  title={feed.goalTitle}
                  member={feed.member}
                  description={feed.timeline.description}
                  createdAt={feed.timeline.createdAt}
                  image={feed.timeline.image}
                  isFinal={feed.timeline.finalTimeline}
                />
              )
            })}
          </>
        )}
      </TimelineContainer>
    </TimelineList>
  )
}
