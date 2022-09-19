import { Input, Textarea } from '../../styles/globalStyles'
import { MilestoneContainer, CalendarContainer } from './MilestoneStyle'
import { CompleteBtn } from '../Widget/WidgetStyle'
// eslint-disable-next-line import/no-named-as-default
import Calendar from 'react-calendar'

export const NewMilestone = () => {
  return (
    <MilestoneContainer>
      <div className="inputs">
        <p>분류</p>
      </div>
      <div className="inputs">
        <p>제목</p>
        <Input />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <p>소개</p>
          <p>
            목표를 간단히 설명해 주세요. 한 번 작성한 목표는 수정할 수 없어요.
          </p>
        </div>
        <Textarea />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <p>성공시</p>
          <p>나와의 약속을 만들어주세요.</p>
        </div>
        <Input />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <p>실패시</p>
          <p>나와의 약속을 만들어주세요.</p>
        </div>
        <Input />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <p>기간 설정</p>
          <p>종료날짜를 설정해주세요</p>
        </div>
        <CalendarContainer>
          <Calendar calendarType="US" />
        </CalendarContainer>
      </div>
      <div className="inputs">
        <div className="p__guide">
          <p>배너 이미지 업로드</p>
          <p>배너 이미지를 업로드하세요</p>
        </div>
        <div className="input__file">
          <CompleteBtn>업로드</CompleteBtn>
        </div>
      </div>
      <div className="button__complete">
        <CompleteBtn>생성하기</CompleteBtn>
      </div>
    </MilestoneContainer>
  )
}
