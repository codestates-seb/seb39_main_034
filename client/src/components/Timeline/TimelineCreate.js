import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
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

export default function TimelineCreate({
  setTimelineData,
  setOpenCreateTimeline,
}) {
  const { id } = useParams()
  const date = new Date()
  const today = moment(date).format('YYYY년 MM일 DD일')
  const [description, setDescription] = useState('') // 타임라인 내용을 받을 곳
  const [timelineImageId, setTimelineImageId] = useState() // 타임라인 이미지 아이디 받을 곳
  const [imgFile, setImgFile] = useState(null) //이미지 파일을 받을 곳
  const [imgBase, setImgBase] = useState([]) // 이미지 미리보기 데이터를 받을 곳
  const [openChoseImage, setOpenChoseImage] = useState(false) // 이미지 버튼 상태 관리
  const [openChoseEmoji, setOpenChoseEmoji] = useState(false) // 이모지 버튼 상태 관리

  const handleChangeTextarea = (e) => {
    setDescription(e.target.value)
  }
  const handleClickImage = () => {
    setOpenChoseImage(!openChoseImage)
  }
  const handleClickEmoji = () => {
    setOpenChoseEmoji(!openChoseEmoji)
  }

  // 이미지 선택 시 실행
  const handleChangeImageFile = (event) => {
    // console.log('파일내용: ', event.target.files)
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
    if (timelineImageId === undefined) {
      setTimelineImageId('')
    }
    try {
      const postResponse = await axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + `/v1/goal/${id}/timeline`,
        data: {
          description: description,
          imageId: timelineImageId,
        },
      })
      const getResponse = await axios({
        method: 'get',
        url: process.env.REACT_APP_API_URL + `/v1/goal/${id}`,
      }).then((res) => {
        setTimelineData(res.data.goal.timelineList)
      })
      setDescription('')
      setOpenCreateTimeline(false)
      console.log('postResponse >>', postResponse)
      console.log('getResponse >>', getResponse)
    } catch (err) {
      console.log('Error >>', err)
    }
  }

  const handleClickSubmitCancle = () => {
    setOpenCreateTimeline(false)
    setDescription('')
  }

  return (
    <TimelineContainer>
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
                {openChoseEmoji ? <Picker onEmojiClick={onEmojiClick} /> : null}
              </EmojiPickerBox>
            </Icon>
          </div>
        </div>
        {/* ~~~ 타임라인 컨텐트 ~~~ */}
        <div className="contents__timeline">
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
                  <CompleteBtn onClick={handleClickImageUpload}>
                    업로드
                  </CompleteBtn>
                </>
              )
            })}
            {/* 타임라인 내용 */}
            <TimelineTextarea
              id="text-area"
              value={description}
              onChange={handleChangeTextarea}
            />
          </div>
          <div className="button__complete">
            <CompleteBtn onClick={handleClickSubmit}>작성완료</CompleteBtn>
            <CompleteBtn onClick={handleClickSubmitCancle}>
              작성취소
            </CompleteBtn>
          </div>
        </div>
      </article>
    </TimelineContainer>
  )
}
