import { Text } from './TimelinelistStyle'
import { EditBtn } from '../Widget/WidgetStyle'
import { Icon } from '../../styles/globalStyles'
import moment from 'moment'
import { useState } from 'react'
import TimelineEdit from './TimelineEdit'
import TimelineDelete from './TimelineDelete'

export default function TimelineList({ timelineId, description, createdAt }) {
  const today = moment(createdAt).format('YYYY년 MM일 DD일')
  const [openEdit, setOpenEdit] = useState(false)

  const editTimelineToggle = () => {
    setOpenEdit(!openEdit)
  }
  return (
    <article>
      {/*후기 조건: status===0일 경우(진행중) 타임라인만 나오고*/}
      {/*status===0이 아닐 경우(진행종료) 추가적으로 후기 타임라인이 나옴 */}
      <div className="header__timeline">
        <Text>작성일: {today}</Text>
        <div className="header__timeline--icon">
          <Icon>
            <EditBtn size={20} onClick={editTimelineToggle} />
            <TimelineDelete timelineId={timelineId} description={description} />
          </Icon>
        </div>
      </div>
      {/* --content-- */}
      {openEdit ? (
        <TimelineEdit
          description={description}
          timelineId={timelineId}
          setOpenEdit={setOpenEdit}
        />
      ) : (
        <div className="contents__timeline">
          <div className="contents">{description}</div>
        </div>
      )}
    </article>
  )
}
