import axios from 'axios'
import { useState } from 'react'
// import { CompleteBtn } from '../Widget/WidgetStyle'

export default function ImageUpload() {
  const [imgFile, setImgFile] = useState(null) //파일을 받을 곳
  const [imgBase, setImgBase] = useState([]) // 미리보기 이미지 데이터를 받을 곳
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
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }

  //이미지 미리보기
  const handleChangeFile = (event) => {
    console.log('파일내용: ', event.target.files)
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
          //   console.log('base: ', base)
          if (base) {
            //  images.push(base.toString())
            const baseSub = base.toString()
            setImgBase((imgBase) => [...imgBase, baseSub])
          }
        }
      }
    }
  }
  return (
    <>
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
      <form id="form__photo">
        <input
          type="file"
          id="input__photo"
          name="photo"
          onChange={handleChangeFile}
          multiple="multiple"
        />
      </form>
      {/* <CompleteBtn onClick={handleUpload}>업로드</CompleteBtn> */}
      <button type="submit" onClick={handleUpload}>
        업로드
      </button>
    </>
  )
}
