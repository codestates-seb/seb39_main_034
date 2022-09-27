// import { CompleteBtn } from '../Widget/WidgetStyle'
// import { ImageForm } from './ImageForm'

export default function ImageUpload({
  setImgBase,
  setOpenChoseImage,
  setImgFile,
}) {
  //이미지 미리보기
  const handleChangeFile = (event) => {
    setOpenChoseImage(false)
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
      {/* <ImageForm imgBase={imgBase} /> */}
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
    </>
  )
}
