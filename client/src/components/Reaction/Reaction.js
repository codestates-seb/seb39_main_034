import { ReactionBar, SubscribeBtn, CheerBtn } from './ReactionStyle'

function Reaction({ subscriber, cheers }) {
  return (
    <>
      <ReactionBar>
        <div>
          {/* 작성자라면 팔로우 버튼 안보이게*/}
          <SubscribeBtn click={false} />
          {subscriber
            ? `${subscriber.length}명이 팔로우하고 있어요`
            : '아직 팔로우가 없어요...'}
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
