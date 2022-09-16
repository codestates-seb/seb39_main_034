import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { CgMenuRight } from 'react-icons/cg'
import {
  Nav,
  NavContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  LoginMenu,
} from './GnbStyles.js'
// import { data } from "../../data/NavbarData";

function Gnb() {
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(!show)
  }

  return (
    <Nav>
      <NavContainer>
        <NavLogo to="/home">
          <NavIcon src="/logo.png" alt="logo" />
        </NavLogo>
        <NavMenu>글보기 명예의전당 이벤트</NavMenu>
        <LoginMenu>로그인 회원가입</LoginMenu>
        <MobileIcon onClick={handleClick}>
          {show ? <FaTimes /> : <CgMenuRight />}
        </MobileIcon>
      </NavContainer>
    </Nav>
  )
}

export default Gnb
