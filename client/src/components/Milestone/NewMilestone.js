import { Input, Textarea } from '../../styles/globalStyles'
import { MilestoneContainer, CalendarContainer } from './MilestoneStyle'
import { CompleteBtn } from '../Widget/WidgetStyle'
// eslint-disable-next-line import/no-named-as-default
import Calendar from 'react-calendar'
import moment from 'moment'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const NewMilestone = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [successAward, setSuccessAward] = useState('')
  const [failurePenalty, setFailurePenalty] = useState('')
  const [endDate, setEndDate] = useState(new Date())

  let smallCalenderMinDate = new Date()
  let smallCalenderMaxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  )

  const onChangeCategory = (e) => {
    setCategory(e.target.value)
    // console.log(e.target.value)
  }
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }
  const onChangeSuccessAward = (e) => {
    setSuccessAward(e.target.value)
  }
  const onChangeFailurePenalty = (e) => {
    setFailurePenalty(e.target.value)
  }
  const onChangeDate = (e) => {
    setEndDate(moment(e).format('YYYY-MM-DD'))
    // console.log(moment(e).format('YYYY-MM-DD'))
  }

  const handleSubmitClick = () => {
    console.log('click')
    axios({
      method: 'post',
      url: process.env.REACT_APP_API_URL + '/v1/goal/create',
      data: {
        title: title,
        description: description,
        successAward: successAward,
        failurePenalty: failurePenalty,
        endDate: endDate,
        category: category,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          navigate(`/goal/detail/${res.data}`)
        }
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <MilestoneContainer>
      <div className="inputs">
        <h3>분류</h3>
        <SelectBox
          options={Options}
          name="category"
          value={category}
          onChange={onChangeCategory}
        />
      </div>
      <div className="inputs">
        <h3>제목</h3>
        <Input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={onChangeTitle}
          required
        />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <h3>소개</h3>
          <p>
            목표를 간단히 설명해 주세요. 한 번 작성한 목표는 수정할 수 없어요.
          </p>
        </div>
        <Textarea
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={onChangeDescription}
          required
        />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <h3>성공시</h3>
          <p>나와의 약속을 만들어주세요.</p>
        </div>
        <Input
          type="text"
          name="successAward"
          id="successAward"
          value={successAward}
          onChange={onChangeSuccessAward}
          required
        />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <h3>실패시</h3>
          <p>나와의 약속을 만들어주세요.</p>
        </div>
        <Input
          type="text"
          name="failurePenalty"
          id="failurePenalty"
          value={failurePenalty}
          onChange={onChangeFailurePenalty}
          required
        />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <h3>기간 설정</h3>
          <p>종료날짜를 설정해주세요</p>
        </div>
        <p>종료 날짜: {moment(endDate).format('YYYY-MM-DD')}</p>
        <CalendarContainer>
          <Calendar
            onChange={onChangeDate}
            date={endDate}
            formatDay={(locale, date) => moment(date).format('DD')} //'일' 제외 숫자만 보이게 하기
            calendarType="US" //요일을 일요일부터 시작하게 하기
            minDetail="month" //상단 네비에 '월' 단위만 보이게 하기
            maxDetail="month" //상단 네비에 '월' 단위만 보이게 하기
            minDate={smallCalenderMinDate} //최소날째 정하기
            maxDate={smallCalenderMaxDate} //최대날짜 정하기
            required
          />
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
        <CompleteBtn type="submit" onClick={handleSubmitClick}>
          생성하기
        </CompleteBtn>
      </div>
    </MilestoneContainer>
  )
}

//카테고리 분류 선택 옵션
const Options = [
  { value: '운동', name: '운동' },
  { value: '생활습관', name: '생활습관' },
  { value: '독서', name: '독서' },
  { value: '공부', name: '공부' },
]

const SelectBox = (props) => {
  return (
    <select onChange={props.onChange}>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
