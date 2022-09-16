import {
  CompleteBtn,
  PlusBtn,
  EditBtn,
  DeleteBtn,
  CloseBtn,
  OpenBtn,
  AddPicBtn,
  AddEmojiBtn,
  XBtn,
} from './WidgetStyle'

function Form() {
  return (
    <>
      현재 버튼을 보여주고 있는 Form/Form.js 파일은 아직 쓸모를 못 찾았습니다~~{' '}
      <br />
      그냥 파일 분리 형식 맞춰서 만든 거에용
      <div>
        <CompleteBtn>작성하기</CompleteBtn>
        <CompleteBtn>생성하기</CompleteBtn>
        <CompleteBtn>수정완료</CompleteBtn>
        <PlusBtn>+</PlusBtn>
      </div>
      <div>
        <EditBtn />
        <DeleteBtn />
        <CloseBtn />
        <OpenBtn />
        <AddPicBtn />
        <AddEmojiBtn />
        <XBtn />
      </div>
    </>
  )
}

export default Form
