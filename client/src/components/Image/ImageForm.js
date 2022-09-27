import axios from 'axios'
// import { useState } from 'react'
import { CompleteBtn } from '../Widget/WidgetStyle'

export function ImageForm({ imgBase, imgFile }) {
  // const [timelineImageId, setTimelineImageId] = useState()

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
        // setTimelineImageId(res.data.imageId)
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }
  return (
    <>
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
    </>
  )
}
