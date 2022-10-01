import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line import/no-named-as-default
import Calendar from 'react-calendar'
import moment from 'moment'
import { Input, Textarea } from '../../styles/globalStyles'
import { MilestoneContainer, CalendarContainer } from './MilestoneStyle'
import { CompleteBtn, AddPicBtn } from '../Widget/WidgetStyle'
import useGetAuth from '../../hook/useGetAuth'

export const NewMilestone = () => {
  const navigate = useNavigate()
  const [tryAuth, setTryAuth] = useState(null)
  const { authLoading, authCheck } = useGetAuth(tryAuth)
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

  // 전송 버튼 클릭 시 tryAuth 상태 true로 변경
  // => useGetAuth가 tryAuth 상태에 의존하므로 실행되어 토큰 상태 재확인
  // => useEffect에서 tryAuth 상태가 true일 경우 submit 실행
  const handleClickSubmit = () => {
    console.log('생성하기 버튼 클릭, tryauth : true')
    setTryAuth(true)
  }

  const submit = () => {
    // 게시글 작성에 필요한 각 단계가 완성되지 않았을 경우 tryAuth을 false로 변경
    if (category === '' || category === '선택안함') {
      console.log('tryAuth : false')
      setTryAuth(false)
      alert('카테고리를 입력하세요')
    } else if (title === '') {
      console.log('tryAuth : false')
      setTryAuth(false)
      alert('제목을 입력하세요')
    } else if (description === '') {
      console.log('tryAuth : false')
      setTryAuth(false)
      alert('목표를 소개하는 글을 입력하세요')
    } else if (successAward === '') {
      console.log('tryAuth : false')
      setTryAuth(false)
      alert('성공 시 나와의 약속을 만들어주세요')
    } else if (failurePenalty === '') {
      console.log('tryAuth : false')
      setTryAuth(false)
      alert('실패 시 나와의 약속을 만들어주세요')
    } else if (endDate === '') {
      console.log('tryAuth : false')
      setTryAuth(false)
      alert('종료 날짜를 선택해주세요')
    } else {
      if (milestoneImageId === undefined && imgName) {
        console.log('tryAuth : false')
        setTryAuth(false)
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
          console.log(err)
        }
      }
    }
  }

  useEffect(() => {
    console.log('authLoading: ', authLoading)
    console.log('authCheck: ', authCheck)
    // 아직 auth 검사가 진행중이라면 스탑
    if (authLoading === true) {
      null
    }
    // auth 검사를 하고 보니 토큰이 만료되었다면 스탑
    else if (authCheck === false) {
      console.log('authcheck: ', authCheck)
      alert('장기간 이용하지 않아 로그아웃 되었습니다')
      navigate('/login')
    }
    // 토큰이 살아있다면 submit 함수 실행
    else if (tryAuth === true) {
      try {
        submit()
      } catch (err) {
        console.log(err)
        alert('오류가 발생했습니다')
        navigate(0)
      }
    }
  }, [authLoading])

  return (
    <MilestoneContainer>
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
          <p>
            목표를 간단히 설명해 주세요. 한 번 작성한 목표는 수정할 수 없어요.
          </p>
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
          <p>배너 이미지 업로드</p>
          <p>배너 이미지를 업로드하세요</p>
        </div>
        <div className="input__file">
          {/* 이미지 사진 선택 */}
          <AddPicBtn onClick={HandleClickImage} />
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
          {/* 이미지 미리보기 */}
          {imgBase.map((item, idx) => {
            return (
              <>
                <img
                  key={idx}
                  className="d-block w-100"
                  src={item}
                  alt="First slide"
                  style={{ width: '30%', height: '250px' }}
                />
                {/* 이미지 업로드 */}

                <span>FILE NAME: </span>
                {imgName}
                {milestoneImageId === undefined ? (
                  <CompleteBtn onClick={handleClickUpload}>업로드</CompleteBtn>
                ) : (
                  <div className="button__complete">
                    <span>업로드 완료</span>
                    <CompleteBtn onClick={handleClickImageDelete}>
                      이미지 삭제
                    </CompleteBtn>
                  </div>
                )}
              </>
            )
          })}
        </div>
      </div>
      <div className="button__complete">
        <CompleteBtn type="submit" onClick={handleClickSubmit}>
          생성하기
        </CompleteBtn>
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
    <select onChange={props.onChange}>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
