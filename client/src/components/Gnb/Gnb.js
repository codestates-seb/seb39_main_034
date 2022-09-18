import { Link } from 'react-router-dom'
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
        <NavLogo to="/">
          <NavIcon src="/logo.png" alt="logo" />
        </NavLogo>
        <NavMenu>
          <Link to="/main">
            <li>글보기</li>
          </Link>
          <Link to="/">
            <li>명예의전당</li>
          </Link>
          <Link to="/">
            <li>이벤트</li>
          </Link>
        </NavMenu>
        <LoginMenu>
          <Link to="/login">
            <li>로그인</li>
          </Link>
          <Link to="/signup">
            <li>회원가입</li>
          </Link>
        </LoginMenu>
        <MobileIcon onClick={handleClick}>
          {show ? <FaTimes /> : <CgMenuRight />}
        </MobileIcon>
      </NavContainer>
    </Nav>
  )
}

export default Gnb
