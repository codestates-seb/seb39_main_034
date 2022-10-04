import moment from 'moment'
import { Link } from 'react-router-dom'
import { Text } from '../Timeline/TimelinelistStyle'
import { FeedTitle } from './MyPannelStyle'
import { Profile } from '../Widget/WidgetStyle'
// import { useParams } from 'react-router-dom'

//TimelineItem와 TimelineEdit, TimelineDelete 파일을 합침.
export default function FeedItem({
  goalId,
  member,
  description,
  createdAt,
  image,
}) {
  const date = moment(createdAt).format('YYYY년 MM일 DD일')
  // console.log('이미지 파일: ', imgFile)
  // console.log('타임라인 이미지 아이디: ', timelineImageId)
  // console.log('타임라인 아이디: ', timelineId)

  return (
    <>
      <Link to={`/goal/detail/${goalId}`}>
        <FeedTitle>
          <h4>출처 게시글의 제목</h4>
          <Profile author={member}></Profile>
        </FeedTitle>
      </Link>
      <article>
        {
          <>
            {/* ~~~ 타임라인 헤드 ~~~ */}
            <div className="header__timeline">
              <Text>{date}</Text>
            </div>
            <div className="contents__timeline">
              {/* 이미지가 없다면 내용만 보이게: 분기를 나눈 이유는 이미지가 없을 때 image.url 을 찾을 수 없다는 에러가 나서 추가 */}
              {/* 이미지가 있다면 이미지와 내용이 보이게 */}
              {image === null ? (
                <div className="contents">{description} </div>
              ) : (
                <div className="contents">
                  <img alt="img" src={image.url} className="contents__img" />
                  {description}
                </div>
              )}
            </div>
          </>
        }
      </article>
    </>
  )
}
