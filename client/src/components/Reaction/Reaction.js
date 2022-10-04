import { ReactionBar, SubscribeBtn, CheerBtn } from './ReactionStyle'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FaBookOpen } from 'react-icons/fa'
function Reaction({
  followerData,
  likerData,
  metaData,
  writer,
  goalId,
  getFollower,
  getLiker,
}) {
  const userName = useSelector((state) => state.auth.userName) // 로그인된 유저
  const followerUser = followerData.filter((item) => item === userName) // 팔로우 리스트 중 로그인 유저 필터링
  const likerUser = likerData.filter((item) => item === userName)
  console.log('팔로우 리스트 중 로그인 유저 필터링: ', followerData)

  const handleClickFllower = async () => {
    try {
      await axios.get(`/v1/goal/${goalId}/following`)
      await getFollower()
      console.log('handleClickFllower axios 요청')
    } catch (err) {
      console.log('ERROR: ', err)
    }
  }

  const handleClickLiker = async () => {
    try {
      await axios.get(`/v1/goal/${goalId}/liking`)
      await getLiker()
      console.log('handleClickLiker axios 요청')
    } catch (err) {
      console.log('ERROR: ', err)
    }
  }

  return (
    <>
      <ReactionBar>
        <div className="reaction">
          <p>
            <FaBookOpen size={15} />
            {metaData.numberOfFollowers > 0
              ? `${metaData.numberOfFollowers}명이 팔로우하고 있어요!`
              : '아직 팔로워가 없어요..'}
          </p>
          <p>
            <FaBookOpen size={15} />
            {metaData.numberOfLiker > 0
              ? `${metaData.numberOfLiker}명이 응원하고 있어요!`
              : '아직 응원이 없어요..'}
          </p>
        </div>
        <div className="button__reaction">
          {userName === writer || userName === null ? (
            // 비로그인 유저이거나 작성자일 경우 요청할 수 없게
            <div>
              <div>
                <SubscribeBtn />
                팔로우 하기
              </div>
              <div>
                <CheerBtn />
                응원하기
              </div>
            </div>
          ) : (
            // 로그인 유저이고 작성자가 아닐 경우
            <div>
              {/* 이미 팔로우를 한 유저라면 */}
              {followerUser[0] === userName ? (
                <div>
                  <SubscribeBtn follower={true} />
                  <div>팔로우 중</div>
                </div>
              ) : (
                //팔로우 하지 않은 유저라면
                <div>
                  <SubscribeBtn onClick={handleClickFllower} />
                  팔로우 하기
                </div>
              )}
              {likerUser[0] === userName ? (
                <div>
                  <CheerBtn liker={true} />
                  <div>응원 중</div>
                </div>
              ) : (
                <div>
                  <CheerBtn onClick={handleClickLiker} />
                  응원하기
                </div>
              )}
            </div>
          )}
        </div>
      </ReactionBar>
    </>
  )
}

export default Reaction
