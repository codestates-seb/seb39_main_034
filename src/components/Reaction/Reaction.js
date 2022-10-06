import { ReactionBar, SubscribeBtn, CheerBtn } from './ReactionStyle'

function Reaction({ subscriber, cheers }) {
  return (
    <>
      <ReactionBar>
        <div>
          <SubscribeBtn click={false} />
          {subscriber
            ? `${subscriber.length}명이 구독하고 있어요`
            : '아직 구독자가 없어요...'}
        </div>
        <div>
          <CheerBtn click={false} />
          {cheers
            ? `${cheers.length}명이 당신을 응원해요!`
            : '당신을 응원해요!'}
        </div>
      </ReactionBar>
    </>
  )
}

export default Reaction
