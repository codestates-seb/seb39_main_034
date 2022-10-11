import React from 'react'
import styled from 'styled-components'
import { Button } from '../../styles/globalStyles'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import {
  BsCaretDownFill,
  BsCaretUpFill,
  BsEmojiSmileFill,
} from 'react-icons/bs'
import { ImFilePicture } from 'react-icons/im'
import { AiFillCloseSquare } from 'react-icons/ai'

export const CompleteBtnBase = styled(Button)`
  width: 100px;
  height: 40px;
  margin: 0 4px;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.violet_m};
  &:hover {
    background: ${({ theme }) => theme.violet_l};
  }
`
export const CompleteBtn = React.memo(function CompleteBtn({
  onClick,
  // location,
  editState,
  value,
  plusState,
}) {
  if (editState === undefined) {
    // console.log({ location, plusState })
  } else if (plusState === undefined) {
    // console.log({ location, editState })
  }

  return <CompleteBtnBase onClick={onClick}>{value}</CompleteBtnBase>
})

export const PlusBtnBase = styled(Button)`
  width: 100%;
  height: 52px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.border};
  &:hover {
    background: ${({ theme }) => theme.violet_m};
  }
`

export const PlusBtn = React.memo(function PlusBtn({ onClick }) {
  return (
    <PlusBtnBase onClick={onClick}>
      <FaPlus size="30" />
    </PlusBtnBase>
  )
})

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

export const EditBtn = React.memo(function EditBtn({ onClick }) {
  return (
    <GrayBtn onClick={onClick}>
      <RiPencilFill size="24" />
    </GrayBtn>
  )
})

export const DeleteBtn = ({ onClick }) => (
  <GrayBtn onClick={onClick}>
    <FaTrashAlt size="24" />
  </GrayBtn>
)

export const CloseBtn = ({ onClick }) => (
  <GrayBtn onClick={onClick}>
    <BsCaretUpFill size="24" />
  </GrayBtn>
)

export const OpenBtn = ({ onClick }) => (
  <GrayBtn onClick={onClick}>
    <BsCaretDownFill size="24" />
  </GrayBtn>
)

export const AddPicBtn = ({ onClick }) => (
  <GrayBtn onClick={onClick}>
    <ImFilePicture size="24" />
  </GrayBtn>
)

export const AddEmojiBtn = ({ onClick }) => (
  <GrayBtn onClick={onClick}>
    <BsEmojiSmileFill size="24" />
  </GrayBtn>
)

export const XBtn = ({ onClick }) => (
  <GrayBtn onClick={onClick}>
    <AiFillCloseSquare size="24" />
  </GrayBtn>
)

export const Notice = styled.div`
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.dark};
  > div {
    margin: 0 auto;
    text-align: center;
  }
`

const ProfileBase = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  height: 30px;
  padding: 4px 8px;
  cursor: pointer;
  div.image {
    width: 28px;
    height: 28px;
    border-radius: 28px;
    background-color: ${({ theme }) => theme.background};
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-position: center;
    margin-right: 8px;
  }
  div.text {
    font-size: ${({ theme }) => theme.font16};
  }
  &:hover {
    div.image {
      border: 3px solid ${({ theme }) => theme.violet_m};
    }
  }
`

const BigProfileBase = styled(ProfileBase)`
  div.image {
    width: 84px;
    height: 84px;
    border-radius: 84px;
    margin-right: 16px;
  }
  div.text {
    font-size: ${({ theme }) => theme.font18};
  }
`
export const BigProfile = ({ image, author, onClick }) => (
  <BigProfileBase image={image} onClick={onClick}>
    <div className="image"></div>
    <div className="text">{author}</div>
  </BigProfileBase>
)

export const Profile = ({ image, author, onClick }) => (
  <ProfileBase image={image} onClick={onClick}>
    <div className="image"></div>
    <div className="text">{author}</div>
  </ProfileBase>
)

export const MoreBase = styled.div`
  width: 100%;
  text-align: center;
  padding: 16px 0 24px 0;
`
export const MoreButton = styled(Button)`
  padding: 12px 16px;
`
export const MoreBtn = React.memo(function MoreBtn({ onClick, text }) {
  return (
    <MoreBase>
      <MoreButton onClick={onClick}>{text}</MoreButton>
    </MoreBase>
  )
})

export const EventBanner = styled.div`
  width: 100%;
  height: 230px;
  margin: 12px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 8px ${({ theme }) => theme.tertiary};
  overflow: hidden;
  cursor: pointer;
  .event_header {
    height: 50px;
    padding: 0 12px;
    line-height: 54px;
    font-weight: 500;
    font-size: ${({ theme }) => theme.font16};
    background: ${({ theme }) => theme.background};
  }
  .event_content {
    height: 180px;
    width: 100%;
    background-image: url(${({ url }) => url});
    background-size: cover;
    background-position: center;
  }
`
