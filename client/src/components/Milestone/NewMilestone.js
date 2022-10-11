import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// eslint-disable-next-line import/no-named-as-default
import Calendar from 'react-calendar'
import moment from 'moment'
import { Input, Textarea } from '../../styles/globalStyles'
import {
  MilestoneContainer,
  CalendarContainer,
  Select,
  ExBtn,
} from './MilestoneStyle'
import { CompleteBtn, AddPicBtn } from '../Widget/WidgetStyle'
import { handleAuthErr } from '../Account/TokenAuth'

export const NewMilestone = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [successAward, setSuccessAward] = useState('')
  const [failurePenalty, setFailurePenalty] = useState('')
  const [endDate, setEndDate] = useState('') //종료날짜 받을 곳
  const [milestoneImageId, setMilestoneImageId] = useState() // 마일스톤 베너 이미지 아이디 받을 곳
  const [imgName, setImgName] = useState('') // 이미지 이름 받을 곳
  const [imgBase, setImgBase] = useState([]) // 미리보기 이미지 데이터를 받을 곳
  const [imgFile, setImgFile] = useState(null) //파일을 받을 곳
  const [openChoseImage, setOpenChoseImage] = useState(false) //이미지 아이콘 클릭 시 상태 관리

  // console.log('목표작성하기 이미지 아이디: ', milestoneImageId)

  let smallCalenderMinDate = new Date()
  let smallCalenderMaxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  )

  const HandleChangeCategory = (e) => {
    setCategory(e.target.value)
    // console.log(e.target.value)
  }
  const HandleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const HandleChangeDescription = (e) => {
    setDescription(e.target.value)
  }
  const HandleChangeSuccessAward = (e) => {
    setSuccessAward(e.target.value)
  }
  const HandleChangeFailurePenalty = (e) => {
    setFailurePenalty(e.target.value)
  }
  const HandleChangeDate = (e) => {
    setEndDate(moment(e).format('YYYY-MM-DD'))
    // console.log(moment(e).format('YYYY-MM-DD'))
  }
  const HandleClickImage = () => {
    setOpenChoseImage(!openChoseImage)
  }
  // console.log(endDate)

  const formData = new FormData()
  const handleClickUpload = () => {
    Object.values(imgFile).forEach((file) => formData.append('image', file))

    axios({
      method: 'post',
      url: process.env.REACT_APP_API_URL + `/v1/upload`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(res)
        setMilestoneImageId(res.data.imageId)
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }
  // 이미지 선택 시 실행
  const handleChangeFile = (event) => {
    setOpenChoseImage(false)
    // console.log('파일내용: ', event.target.files)
    setImgName(event.target.files[0].name)
    setImgFile(event.target.files)
    setImgBase([])
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader()
        // 1. 파일을 읽어 버퍼에 저장.
        reader.readAsDataURL(event.target.files[i])
        // 파일 상태 업데이트 함.
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base = reader.result
          if (base) {
            //  images.push(base.toString())
            const baseSub = base.toString()
            setImgBase((imgBase) => [...imgBase, baseSub])
          }
        }
      }
    }
  }

  // 이미지 삭제 버튼 클릭 시 실행
  const handleClickImageDelete = () => {
    axios({
      method: 'delete',
      url:
        process.env.REACT_APP_API_URL +
        `/v1/delete?imageId=${milestoneImageId}`,
    }).then((res) => {
      console.log(res)
      // 이미지 삭제 시 이미지의 정보는 모두 초기화
      setMilestoneImageId()
      setImgName('')
      setImgBase([])
      setImgFile(null)
    })
  }

  const handleClickSubmit = () => {
    // 게시글 작성에 필요한 각 단계가 완성되지 않았을 경우 tryAuth을 false로 변경
    if (category === '' || category === '선택안함') {
      alert('카테고리를 입력하세요')
    } else if (title === '') {
      alert('제목을 입력하세요')
    } else if (description === '') {
      alert('목표를 소개하는 글을 입력하세요')
    } else if (successAward === '') {
      alert('성공 시 나와의 약속을 만들어주세요')
    } else if (failurePenalty === '') {
      alert('실패 시 나와의 약속을 만들어주세요')
    } else if (endDate === '') {
      alert('종료 날짜를 선택해주세요')
    } else {
      if (milestoneImageId === undefined && imgName) {
        alert('업로드하지 않은 이미지가 존재합니다. 이미지 업로드를 하세요.')
      } else {
        setMilestoneImageId('')
        try {
          axios({
            method: 'post',
            url: '/v1/goal/create',
            data: {
              title: title,
              description: description,
              successAward: successAward,
              failurePenalty: failurePenalty,
              endDate: endDate,
              category: category,
              imageId: milestoneImageId,
            },
          }).then((res) => {
            console.log(res)
            if (res.status === 201) {
              navigate(`/goal/detail/${res.data}`)
            }
          })
        } catch (err) {
          handleAuthErr(dispatch, navigate, err, handleClickSubmit())
        }
      }
    }
  }

  return (
    <MilestoneContainer>
      <div className="inputs">
        <div className="p__guide">
          <h2>목표 작성하기</h2>
          <p>목표를 만들 수 있어요. 한 번 작성한 목표는 수정할 수 없습니다.</p>
        </div>
      </div>

      <div className="inputs">
        <h3>분류</h3>
        <SelectBox
          options={Options}
          name="category"
          value={category}
          onChange={HandleChangeCategory}
        />
      </div>
      <div className="inputs">
        <h3>제목</h3>
        <Input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={HandleChangeTitle}
          required
        />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <h3>소개</h3>
          <p>목표를 간단히 설명해 주세요.</p>
        </div>
        <Textarea
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={HandleChangeDescription}
          required
        />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <h3>성공시</h3>
          <p>나와의 약속을 만들어주세요.</p>
        </div>
        <div className="p__guide ex">
          <p>예시: </p>
          <ExBtn value="치킨 사먹기" onClick={HandleChangeSuccessAward}>
            치킨 사먹기
          </ExBtn>
          <ExBtn value="여행 가기" onClick={HandleChangeSuccessAward}>
            여행 가기
          </ExBtn>
          <ExBtn value="게임 3시간" onClick={HandleChangeSuccessAward}>
            게임 3시간
          </ExBtn>
        </div>

        <Input
          type="text"
          name="successAward"
          id="successAward"
          value={successAward}
          onChange={HandleChangeSuccessAward}
          required
        />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <h3>실패시</h3>
          <p>나와의 약속을 만들어주세요.</p>
        </div>
        <div className="p__guide ex">
          <p>예시: </p>
          <ExBtn
            value="출퇴근 시 계단만 이용"
            onClick={HandleChangeFailurePenalty}
          >
            출퇴근 시 계단만 이용
          </ExBtn>
          <ExBtn value="스쿼트 3세트 추가" onClick={HandleChangeFailurePenalty}>
            스쿼트 3세트 추가
          </ExBtn>
          <ExBtn value="유튜브 금지" onClick={HandleChangeFailurePenalty}>
            유튜브 금지
          </ExBtn>
        </div>
        <Input
          type="text"
          name="failurePenalty"
          id="failurePenalty"
          value={failurePenalty}
          onChange={HandleChangeFailurePenalty}
          required
        />
      </div>
      <div className="inputs">
        <div className="p__guide">
          <h3>기간 설정</h3>
          <p>종료날짜를 설정해주세요.</p>
        </div>
        <p>
          종료 날짜:
          {endDate === '' ? (
            <span>종료 날짜를 선택해주세요</span>
          ) : (
            moment(endDate).format('YYYY-MM-DD')
          )}
        </p>
        <CalendarContainer>
          <Calendar
            onChange={HandleChangeDate}
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
          <h3>배너 이미지 업로드</h3>
          <p>배너 이미지를 업로드하세요</p>
          <AddPicBtn onClick={HandleClickImage} />
        </div>

        {/* 이미지 사진 선택 */}
        {openChoseImage ? (
          <form id="form__photo">
            <input
              type="file"
              id="input__photo"
              name="photo"
              onChange={handleChangeFile}
              multiple="multiple"
            />
          </form>
        ) : null}

        <div className="input__file">
          {/* 이미지 미리보기 */}
          {imgBase.map((item, idx) => {
            return (
              <div className="banner-img" key={idx}>
                {imgName === '' ? null : (
                  // 이미지 업로드
                  <div className="upload">
                    <span>
                      <b>FILE NAME:</b> {imgName}
                    </span>

                    {milestoneImageId === undefined ? (
                      <CompleteBtn
                        onClick={handleClickUpload}
                        value="업로드"
                      ></CompleteBtn>
                    ) : (
                      <div className="button__complete">
                        <span>업로드 완료</span>
                        <CompleteBtn
                          onClick={handleClickImageDelete}
                          value="이미지 삭제"
                        />
                      </div>
                    )}
                  </div>
                )}
                <img src={item} alt="First slide" />
              </div>
            )
          })}
        </div>
      </div>
      <div className="button__complete">
        <CompleteBtn
          type="submit"
          onClick={handleClickSubmit}
          value="생성하기"
        />
      </div>
    </MilestoneContainer>
  )
}

//카테고리 분류 선택 옵션
const Options = [
  { value: '선택안함', name: '선택안함' },
  { value: '운동', name: '운동' },
  { value: '생활습관', name: '생활습관' },
  { value: '독서', name: '독서' },
  { value: '공부', name: '공부' },
]

const SelectBox = (props) => {
  return (
    <Select onChange={props.onChange}>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  )
}
