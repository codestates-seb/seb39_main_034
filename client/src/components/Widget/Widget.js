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
