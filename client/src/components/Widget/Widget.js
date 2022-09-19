import { FaPlus } from 'react-icons/fa'
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
import { AiFillCloseSquare } from 'react-icons/ai'

function Form() {
  const onClcikTest = () => {
    console.log('click')
  }
  return (
    <>
      <div>
        <CompleteBtn>작성하기</CompleteBtn>
        <CompleteBtn>생성하기</CompleteBtn>
        <CompleteBtn>수정완료</CompleteBtn>
        <PlusBtn onClick={onClcikTest}>
          <FaPlus size={20} />
        </PlusBtn>
      </div>
      <div>
        <EditBtn />
        <DeleteBtn />
        <CloseBtn />
        <OpenBtn />
        <AddPicBtn />
        <AddEmojiBtn />
        <XBtn>
          <AiFillCloseSquare size={20} />
        </XBtn>
      </div>
    </>
  )
}

export default Form
