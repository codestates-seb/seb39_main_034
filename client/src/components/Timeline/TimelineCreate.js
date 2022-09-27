import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import {
  TimelineContainer,
  TimelineTextarea,
  EmojiPickerBox,
  ImageBox,
  Text,
} from './TimelinelistStyle'
import { CompleteBtn, AddPicBtn, AddEmojiBtn } from '../Widget/WidgetStyle'
import { Icon } from '../../styles/globalStyles'
import Picker from 'emoji-picker-react'
import ImageUpload from '../Image/ImageUpload'
// import { ImageForm } from '../Image/ImageForm'

export default function TimelineCreate({ createdAt }) {
  const { id } = useParams()
  const today = moment(createdAt).format('YYYY년 MM일 DD일')

  const [description, setDescription] = useState('')
  const [openChoseEmoji, setOpenChoseEmoji] = useState(false)
  const [openChoseImage, setOpenChoseImage] = useState(false)
  const [imgBase, setImgBase] = useState([]) // 미리보기 이미지 데이터를 받을 곳
  const [imgFile, setImgFile] = useState(null) //파일을 받을 곳
  // const [imageId, setImageId] = useState('')
  const [timelineImageId, setTimelineImageId] = useState()
  // console.log(timelineImageId)

  const handleSubmitClick = () => {
    if (timelineImageId === undefined) {
      setTimelineImageId('')
    }
    axios({
      method: 'post',
      url: process.env.REACT_APP_API_URL + `/v1/goal/${id}/timeline`,
      data: {
        description: description,
        imageId: timelineImageId,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const HnadleEmoji = () => {
    setOpenChoseEmoji(!openChoseEmoji)
  }
  const HandleImage = () => {
    setOpenChoseImage(!openChoseImage)
  }

  const handleTextarea = (e) => {
    setDescription(e.target.value)
  }

  const onEmojiClick = (event, emojiObject) => {
    const textAreaElement = document.getElementById('text-area')
    setDescription(
      description.substr(0, textAreaElement.selectionStart) +
        emojiObject.emoji +
        description.substr(textAreaElement.selectionEnd)
    )
  }
  // const parentFunction = (id) => {
  //   if (id === undefined) {
  //     setImageId('')
  //   } else {
  //     setImageId(id)
  //   }
  //   console.log(id)
  // }
  const formData = new FormData()
  const handleUpload = () => {
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

  return (
    <TimelineContainer>
      <article>
        {/* --header-- */}
        <div className="header__timeline">
          <Text>작성일: {today} </Text>
          <div className="header__timeline--icon">
            <Icon>
              <AddPicBtn onClick={HandleImage} />

              {openChoseImage ? (
                <ImageBox>
                  <ImageUpload
                    setImgBase={setImgBase}
                    setOpenChoseImage={setOpenChoseImage}
                    setImgFile={setImgFile}
                  />
                </ImageBox>
              ) : null}
            </Icon>
            <Icon>
              <AddEmojiBtn onClick={HnadleEmoji} />
              <EmojiPickerBox>
                {openChoseEmoji ? <Picker onEmojiClick={onEmojiClick} /> : null}
              </EmojiPickerBox>
            </Icon>
          </div>
        </div>
        {/* --content-- */}
        <div className="contents__timeline">
          <div className="contents">
            {/* <ImageForm
              imgBase={imgBase}
              imgFile={imgFile}
              parentFunction={parentFunction}
            /> */}
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
                  <CompleteBtn onClick={handleUpload}>업로드</CompleteBtn>
                </>
              )
            })}
            <TimelineTextarea
              id="text-area"
              value={description}
              onChange={handleTextarea}
            />
          </div>
          <div className="button__complete">
            <CompleteBtn type="submit" onClick={handleSubmitClick}>
              작성완료
            </CompleteBtn>
          </div>
        </div>
      </article>
    </TimelineContainer>
  )
}
