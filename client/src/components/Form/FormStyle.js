import styled from 'styled-components'
import { Button } from '../../styles/globalStyles'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrashAlt } from 'react-icons/fa'
import {
  BsCaretUpFill,
  BsCaretDownFill,
  BsEmojiSmileFill,
} from 'react-icons/bs'
import { ImFilePicture } from 'react-icons/im'
import { AiFillCloseSquare } from 'react-icons/ai'

export const CompleteBtn = styled(Button)`
  width: 100px;
  height: 40px;
  margin: 0 4px;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.violet_m};
  &:hover {
    background: ${({ theme }) => theme.violet_l};
  }
`
export const PlusBtn = styled(Button)`
  width: 1110px;
  height: 60px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.border};
  &:hover {
    background: ${({ theme }) => theme.violet_m};
  }
`
const GrayBtn = styled.button`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.tertiary};
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.dark};
  }
`
export const EditBtn = () => (
  <GrayBtn>
    <RiPencilFill size="24" />
  </GrayBtn>
)

export const DeleteBtn = () => (
  <GrayBtn>
    <FaTrashAlt size="24" />
  </GrayBtn>
)

export const CloseBtn = () => (
  <GrayBtn>
    <BsCaretUpFill size="24" />
  </GrayBtn>
)

export const OpenBtn = () => (
  <GrayBtn>
    <BsCaretDownFill size="24" />
  </GrayBtn>
)

export const AddPicBtn = () => (
  <GrayBtn>
    <ImFilePicture size="24" />
  </GrayBtn>
)

export const AddEmojiBtn = () => (
  <GrayBtn>
    <BsEmojiSmileFill size="24" />
  </GrayBtn>
)

export const XBtn = () => (
  <GrayBtn>
    <AiFillCloseSquare size="24" color={({ theme }) => theme.dark} />
  </GrayBtn>
)
