import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { CgMenuRight } from 'react-icons/cg'
import {
  NavContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  LoginMenu,
} from './GnbStyles.js'

function Gnb() {
  //모바일 메뉴 오픈 상태
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(!show)
  }
  const navStyle = ({ isActive }) => ({
    color: isActive ? '#C77DFF' : '#191a20',
  })

  return (
    <NavContainer>
      <NavLogo to="/">
        <NavIcon src="/logo.png" alt="logo" />
      </NavLogo>
      <NavMenu show={show}>
        <NavLink style={navStyle} to="/main">
          <li>글보기</li>
        </NavLink>
        <NavLink style={navStyle} to="/">
          <li>명예의전당</li>
        </NavLink>
        <NavLink style={navStyle} to="/">
          <li>이벤트</li>
        </NavLink>
        <NavLink style={navStyle} to="/mypage">
          <li>마이페이지</li>
        </NavLink>
      </NavMenu>
      <LoginMenu show={show}>
        <NavLink style={navStyle} to="/login">
          <li>로그인</li>
        </NavLink>
        <NavLink style={navStyle} to="/signup">
          <li>회원가입</li>
        </NavLink>
      </LoginMenu>
      <MobileIcon onClick={handleClick}>
        {show ? <FaTimes /> : <CgMenuRight />}
      </MobileIcon>
    </NavContainer>
  )
}

export default Gnb
