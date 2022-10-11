import axios from 'axios'
import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleAuthErr } from '../Account/TokenAuth'
import moment from 'moment'
import Picker from 'emoji-picker-react'
import {
  TimelineContainer,
  TimelineTextarea,
  EmojiPickerBox,
  ImageBox,
  Text,
} from './TimelinelistStyle'
import { CompleteBtn, AddPicBtn, AddEmojiBtn } from '../Widget/WidgetStyle'
import { Icon } from '../../styles/globalStyles'
import { FaPaperclip } from 'react-icons/fa'

export default function TimelineCreate({
  setOnCreateTimeline,
  getTimelineData,
  metaData,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const date = new Date()
  const today = moment(date).format('YYYY년 MM일 DD일')
  const [description, setDescription] = useState('') // 타임라인 내용을 받을 곳
  const [timelineImageId, setTimelineImageId] = useState() // 타임라인 이미지 아이디 받을 곳
  const [imgName, setImgName] = useState('') // 이미지 이름 받을 곳
  const [imgFile, setImgFile] = useState(null) //이미지 파일을 받을 곳
  const [imgBase, setImgBase] = useState([]) // 이미지 미리보기 데이터를 받을 곳
  const [openChoseImage, setOpenChoseImage] = useState(false) // 이미지 버튼 상태 관리
  const [openChoseEmoji, setOpenChoseEmoji] = useState(false) // 이모지 버튼 상태 관리
  const outside = useRef()

  const handleChangeTextarea = (e) => {
    setDescription(e.target.value)
  }
  const handleClickTextarea = (e) => {
    if (e.target == outside.current) {
      setOpenChoseEmoji(false)
      setOpenChoseImage(false)
    }
  }
  const handleClickImage = () => {
    setOpenChoseImage(!openChoseImage)
    setOpenChoseEmoji(false)
  }
  const handleClickEmoji = () => {
    setOpenChoseEmoji(!openChoseEmoji)
    setOpenChoseImage(false)
  }

  // 이미지 선택 시 실행
  const handleChangeImageFile = (event) => {
    // console.log('파일리스트: ', event.target.files)
    // console.log('파일이름: ', event.target.files[0].name)
    setImgName(event.target.files[0].name)
    setOpenChoseImage(false)
    setImgFile(event.target.files)
    setImgBase([])
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader()
        // 파일을 읽어 버퍼에 저장.
        reader.readAsDataURL(event.target.files[i])
        // 파일 상태 업데이트 함.
        reader.onloadend = () => {
          // 읽기가 완료되면 아래코드 실행.
          const base = reader.result
          if (base) {
            const baseSub = base.toString()
            setImgBase((imgBase) => [...imgBase, baseSub])
          }
        }
      }
    }
  }

  // 이미지 업로드 버튼 클릭 시 실행
  const handleClickImageUpload = () => {
    const formData = new FormData()
    Object.values(imgFile).forEach((file) => formData.append('image', file))

    axios({
      method: 'post',
      url: process.env.REACT_APP_API_URL + `/v1/upload`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(res)
        setTimelineImageId(res.data.imageId)
      })
      .catch((err) => {
        console.log('Error: ', err)
        handleAuthErr(dispatch, navigate, err, handleClickImageUpload)
      })
  }

  // 이미지 삭제 버튼 클릭 시 실행
  const handleClickImageDelete = () => {
    axios({
      method: 'delete',
      url:
        process.env.REACT_APP_API_URL + `/v1/delete?imageId=${timelineImageId}`,
    })
      .then((res) => {
        console.log(res)
        setTimelineImageId()
        setImgName('')
        setImgBase([])
        setImgFile(null)
      })
      .catch((err) => {
        console.log('Error: ', err)
        handleAuthErr(dispatch, navigate, err, handleClickImageDelete)
      })
  }

  // 이모지 픽커 클릭 시 실행
  const onEmojiClick = (event, emojiObject) => {
    const textAreaElement = document.getElementById('text-area')
    setDescription(
      description.substr(0, textAreaElement.selectionStart) +
        emojiObject.emoji +
        description.substr(textAreaElement.selectionEnd)
    )
  }

  //작성 완료 버튼 클릭 시 실행
  const handleClickSubmit = async () => {
    //타임라인 내용을 입력하지 않았을 경우
    if (description === '') {
      alert('타임라인 내용을 입력하세요')
    }
    //타임라인 내용을 입력했을 경우
    else {
      //이미지 아이디가 없는데 imgName이 있다면(이미지 업로드를 누르지 않았을 경우)
      if (timelineImageId === undefined && imgName) {
        alert('업로드하지 않은 이미지가 존재합니다. 이미지 업로드를 하세요.')
      }
      //그게 아닌 모든 경우엔 비어있는 문자열로 세팅한 후 axios 요청
      else {
        setTimelineImageId('')
        if (metaData.finalTimelineStatus === 'waiting') {
          try {
            await axios({
              method: 'post',
              url: process.env.REACT_APP_API_URL + `/v1/goal/${id}/timeline`,
              data: {
                description: description,
                imageId: timelineImageId,
                finalTimeline: 1,
              },
            }).then(setDescription(''), setOnCreateTimeline(false))
            await getTimelineData()
          } catch (err) {
            console.log('Error: ', err)
            handleAuthErr(dispatch, navigate, err, handleClickSubmit)
          }
        } else {
          try {
            await axios({
              method: 'post',
              url: process.env.REACT_APP_API_URL + `/v1/goal/${id}/timeline`,
              data: {
                description: description,
                imageId: timelineImageId,
              },
            }).then(setDescription(''), setOnCreateTimeline(false))
            await getTimelineData()
          } catch (err) {
            console.log('Error: ', err)
            handleAuthErr(dispatch, navigate, err, handleClickSubmit)
          }
        }
      }
    }
  }

  // 작성 취소 버튼 클릭 시
  const handleClickSubmitCancle = () => {
    setOnCreateTimeline(false)
    setDescription('')
  }

  return (
    <TimelineContainer>
      {/* 진행완료 되었으나 아직 후기 타임라인을 작성하지 않은 경우 */}
      {metaData.finalTimelineStatus === 'waiting' ? (
        <article>
          <div className="header__timeline review">
            <Text>후기 작성 창</Text>
          </div>
          <div className="contents__timeline review">
            <div className="contents">
              <TimelineTextarea
                id="text-area"
                value={description}
                onChange={handleChangeTextarea}
                onClick={handleClickTextarea}
                placeholder="타임라인 내용을 입력하고 이미지를 추가해보세요."
                ref={outside}
              />
            </div>
            <div className="button__complete">
              <CompleteBtn onClick={handleClickSubmit} value="작성완료" />
              <CompleteBtn onClick={handleClickSubmitCancle} value="작성취소" />
            </div>
          </div>
        </article>
      ) : // 진행완료+후기 타임라인까지 작성 완료된 경우
      metaData.finalTimelineStatus === 'done' ? (
        <article>
          <div>
            이 목표는 완료된 목표입니다. 더 이상 타임라인을 생성할 수 없습니다.
          </div>
        </article>
      ) : (
        // 그 이외 모든 경우
        <article>
          {/* ~~~ 타임라인 헤드 ~~~ */}
          <div className="header__timeline">
            <Text>작성일: {today} </Text>
            <div className="header__timeline--icon">
              <Icon>
                <AddPicBtn onClick={handleClickImage} />
                {/* 이미지 선택 창 */}
                {openChoseImage ? (
                  <ImageBox>
                    <form id="form__photo">
                      <input
                        type="file"
                        id="input__photo"
                        name="photo"
                        accept="image/*" //이미지 파일만 선택할 수 있게
                        onChange={handleChangeImageFile}
                        multiple="multiple"
                      />
                    </form>
                  </ImageBox>
                ) : null}
              </Icon>
              <Icon>
                <AddEmojiBtn onClick={handleClickEmoji} />
                <EmojiPickerBox>
                  {openChoseEmoji ? (
                    <Picker onEmojiClick={onEmojiClick} />
                  ) : null}
                </EmojiPickerBox>
              </Icon>
            </div>
          </div>
          {/* ~~~ 타임라인 컨텐트 ~~~ */}
          <div className="contents__timeline">
            {imgName.length > 0 ? (
              <div className="filenames">
                <div className="filename">
                  <FaPaperclip size={15} color="#240046" />
                  <span>FILE NAME: </span>
                  {imgName}
                </div>
                {timelineImageId === undefined ? (
                  <CompleteBtn
                    onClick={handleClickImageUpload}
                    value="업로드"
                  />
                ) : (
                  <div className="button__complete">
                    <span>업로드 완료</span>
                    <CompleteBtn
                      onClick={handleClickImageDelete}
                      value="이미지삭제"
                    />
                  </div>
                )}
              </div>
            ) : null}

            <div className="contents">
              {/* 이미지 선택 시 이미지 미리보기 */}
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
                  </>
                )
              })}
              {/* 타임라인 내용 */}
              <TimelineTextarea
                id="text-area"
                value={description}
                onChange={handleChangeTextarea}
                onClick={handleClickTextarea}
                ref={outside}
                placeholder="타임라인 내용을 입력하고 이미지를 추가해보세요."
              />
            </div>
            <div className="button__complete">
              <CompleteBtn onClick={handleClickSubmit} value="작성완료" />
              <CompleteBtn onClick={handleClickSubmitCancle} value="작성취소" />
            </div>
          </div>
        </article>
      )}
    </TimelineContainer>
  )
}
