import axios from 'axios'
import { useCallback, useState } from 'react'
import moment from 'moment'
import Picker from 'emoji-picker-react'
import {
  TimelineTextarea,
  EmojiPickerBox,
  Text,
  ImageBox,
} from './TimelinelistStyle'
import {
  CompleteBtn,
  AddEmojiBtn,
  AddPicBtn,
  EditBtn,
  DeleteBtn,
} from '../Widget/WidgetStyle'
import { Icon } from '../../styles/globalStyles'
import { useParams } from 'react-router-dom'
import { FaPaperclip } from 'react-icons/fa'
import { useSelector } from 'react-redux'

//TimelineItem와 TimelineEdit, TimelineDelete 파일을 합침.
export default function TimelineItem(props) {
  const { timelineId, description, createdAt, image, setTimelineData, writer } =
    props
  const { id } = useParams()
  const today = moment(createdAt).format('YYYY년 MM일 DD일')
  const [newDdescription, setNewDescription] = useState(description) // 타임라인 수정 내용을 받을 곳
  const [timelineImageId, setTimelineImageId] = useState() // 타임라인 이미지 아이디 받을 곳
  const [imgFile, setImgFile] = useState(null) //이미지 파일을 받을 곳
  const [imgBase, setImgBase] = useState([]) // 이미지 미리보기 데이터를 받을 곳
  const [onEditTimeline, setOnEditTimeline] = useState(false) // 수정 버튼(수정 창) 상태 관리
  const [openChoseImage, setOpenChoseImage] = useState(false) // 이미지 버튼 상태 관리
  const [openChoseEmoji, setOpenChoseEmoji] = useState(false) // 이모지 버튼 상태 관리
  // console.log('이미지 파일: ', imgFile)
  // console.log('타임라인 이미지 아이디: ', timelineImageId)
  // console.log('타임라인 아이디: ', timelineId)

  const userName = useSelector((state) => state.auth.userName)

  const handleChangeTextarea = (e) => {
    setNewDescription(e.target.value)
  }
  // 수정 버튼 클릭 시 실행 시 이미지 아이디 값 받음
  const handleClickEdit = useCallback(() => {
    setOnEditTimeline(!onEditTimeline)
    if (image === null) {
      //이미지가 null 일땐 id가 없으므로 undefined
      setTimelineImageId(undefined)
    } else {
      //이미지가 있을 땐 id 저장
      setTimelineImageId(image.imageId)
    }
  }, [onEditTimeline])
  const handleClickEmoji = () => {
    setOpenChoseEmoji(!openChoseEmoji)
  }
  const handleClickImage = () => {
    setOpenChoseImage(!openChoseImage)
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

  // 이미지 삭제 버튼 클릭 시 실행
  const handleClickImageDelete = () => {
    axios({
      method: 'delete',
      url:
        process.env.REACT_APP_API_URL +
        `/v1/delete/timelineImage?timelineId=${timelineId}`,
    }).then((res) => {
      console.log(res)
      //이미지가 삭제 되면 이미지의 모든 값 초기화
      setTimelineImageId()
      setImgBase([])
      setImgFile(null)
    })
  }

  // 이모지 픽커 클릭 시 실행
  const onEmojiClick = (event, emojiObject) => {
    const textAreaElement = document.getElementById('text-area')
    setNewDescription(
      newDdescription.substr(0, textAreaElement.selectionStart) +
        emojiObject.emoji +
        newDdescription.substr(textAreaElement.selectionEnd)
    )
  }

  // 타임라인 수정 완료 버튼 클릭 시 실행
  const handleClickSubmit = async () => {
    try {
      await axios({
        method: 'patch',
        url: process.env.REACT_APP_API_URL + `/v1/goal/timeline/${timelineId}`,
        data: {
          description: newDdescription,
          imageId: timelineImageId,
        },
      }).then((res) => {
        console.log(res)
      })
      await axios({
        method: 'get',
        url: process.env.REACT_APP_API_URL + `/v1/goal/${id}`,
      }).then((res) => {
        setTimelineData(res.data.goal.timelineList)
        setOnEditTimeline(!onEditTimeline)
      })
    } catch (err) {
      console.log('Error >>', err)
    }
  }
  const handleClickSubmitCancle = () => {
    setOnEditTimeline(false)
    setNewDescription(description)
    setImgBase([])
  }

  // 타임라인 삭제 버튼 클릭 시 실행
  const handleClickDelete = async () => {
    try {
      axios({
        method: 'delete',
        url: process.env.REACT_APP_API_URL + `/v1/goal/timeline/${timelineId}`,
      })
      axios({
        method: 'get',
        url: process.env.REACT_APP_API_URL + `/v1/goal/${id}`,
      }).then((res) => {
        setTimelineData(res.data.goal.timelineList)
      })
    } catch (err) {
      console.log('Error >>', err)
    }
  }

  return (
    <article>
      {onEditTimeline ? (
        <>
          {/* 타임라인 수정 창 열렸을 때 */}
          {/* ~~~ 타임라인 헤드 ~~~ */}
          <div className="header__timeline">
            <Text>작성일: {today}</Text>
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
                  {openChoseEmoji ? (
                    <Picker onEmojiClick={onEmojiClick} />
                  ) : null}
                </EmojiPickerBox>
              </Icon>
            </div>
          </div>
          {image === null ? (
            //1. 수정 창이 열렸을 때 이미지가 없을 경우
            <div className="contents__timeline">
              {/* ~~~ 파일 이름과 업로드 버튼이 나오는 곳 ~~~ */}
              {/* 이미지를 추가하지 않고 수정했을 때와 이미지 추가 후 수정한 경우를 다시 분기로 나누어줌 */}
              {image === null ? null : (
                <div className="filenames">
                  <div className="filename">
                    {timelineImageId === undefined ? (
                      <CompleteBtn onClick={handleClickImageUpload}>
                        업로드
                      </CompleteBtn>
                    ) : (
                      <div className="button__complete">
                        <span>업로드 완료</span>
                        <CompleteBtn onClick={handleClickImageDelete}>
                          이미지 삭제
                        </CompleteBtn>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* ~~~ 타임라인 내용과 미리보기 이미지가 나오는 곳 ~~~ */}
              <div className="contents">
                {/* 이미지 선택 시 이미지 미리보기 */}
                {imgBase.map((item, idx) => {
                  return (
                    <img
                      key={idx}
                      className="d-block w-100"
                      src={item}
                      alt="First slide"
                      style={{ width: '30%', height: '250px' }}
                    />
                  )
                })}
                <TimelineTextarea
                  id="text-area"
                  value={newDdescription}
                  onChange={handleChangeTextarea}
                />
                <div className="button__complete">
                  <CompleteBtn
                    onClick={handleClickSubmit}
                    location="TimelineItem(edit): 수정 완료 버튼"
                    editState={onEditTimeline}
                    value="수정완료"
                  />
                  <CompleteBtn
                    onClick={handleClickSubmitCancle}
                    location="TimelineItem(edit): 수정 취소 버튼"
                    editState={onEditTimeline}
                    value="수정취소"
                  />
                </div>
              </div>
            </div>
          ) : (
            // 2. 수정 창이 열렸을 때 이미지가 있는 경우
            <div className="contents__timeline">
              {image === null ? null : (
                <div className="filenames">
                  <div className="filename">
                    <FaPaperclip size={15} color="#240046" />
                    <span>imageId: </span>
                    {image.imageId}
                  </div>
                  {timelineImageId === undefined ? (
                    <CompleteBtn onClick={handleClickImageUpload}>
                      업로드
                    </CompleteBtn>
                  ) : (
                    <div className="button__complete">
                      <span>업로드 완료</span>
                      <CompleteBtn onClick={handleClickImageDelete}>
                        이미지 삭제
                      </CompleteBtn>
                    </div>
                  )}
                </div>
              )}
              <div className="contents">
                <img alt="img" src={image.url} className="contents__img" />
                <TimelineTextarea
                  id="text-area"
                  value={newDdescription}
                  onChange={handleChangeTextarea}
                />
                <CompleteBtn onClick={handleClickSubmit}>수정완료</CompleteBtn>
                <CompleteBtn onClick={handleClickSubmitCancle}>
                  수정취소
                </CompleteBtn>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* 타임라인 수정 창 닫혔을 때 */}
          {/* ~~~ 타임라인 헤드 ~~~ */}
          <div className="header__timeline">
            <Text>작성일: {today}</Text>
            {/* 작성자일 경우 보이게*/}
            <div className="header__timeline--icon">
              {userName === writer ? (
                <Icon>
                  <EditBtn
                    size={20}
                    onClick={handleClickEdit}
                    location="TimelineItem(default): 수정 버튼"
                    editState={onEditTimeline}
                  />
                  <DeleteBtn onClick={handleClickDelete} />
                </Icon>
              ) : null}
            </div>
            {/* 작성자가 아니라면 안보이게*/}
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
      )}
    </article>
  )
}
