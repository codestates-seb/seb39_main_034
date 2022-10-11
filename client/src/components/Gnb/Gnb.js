import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Container, Col, Row } from '../../styles/globalStyles'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onLogout } from '../Account/TokenAuth'
import { Profile } from '../Widget/WidgetStyle'
import { FaTimes } from 'react-icons/fa'
import { CgMenuRight } from 'react-icons/cg'
import {
  Wrapper,
  NavContainer,
  NavLogo,
  NavIcon,
  NavMenu,
  LoginMenu,
  ProfileTooltip,
  MobileMenu,
  MobileIcon,
  MobileBackground,
} from './GnbStyles.js'
// import axios from 'axios'

function Gnb() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const isLogin = useSelector((state) => state.auth.isLogin)
  const userName = useSelector((state) => state.auth.userName)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navigate = useNavigate()
  const tooltipRef = useRef()

  //선택된 메뉴 색상 변경
  const navStyle = ({ isActive }) => ({
    color: isActive ? '#C77DFF' : '#191a20',
  })
  const handleLogout = () => {
    onLogout(dispatch)
    navigate('/')
  }
  //모바일 메뉴 핸들러
  const handleMenuClick = () => {
    setShowMobileMenu(!showMobileMenu)
  }
  // 툴팁 이용 핸들러
  const handleTooltipClick = () => {
    setShowTooltip(!showTooltip)
  }
  const handleMypage = () => {
    setShowTooltip(false)
    navigate('/mypage')
  }
  const handleClickOutSide = (e) => {
    if (showTooltip && !tooltipRef.current.contains(e.target)) {
      setShowTooltip(false)
    }
  }

  useEffect(() => {
    if (showTooltip) document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  })

  useEffect(() => {
    if (showMobileMenu) setShowMobileMenu(false)
  }, [pathname])

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col>
            <NavContainer>
              <div className="gnb-left">
                <NavLogo to="/">
                  <NavIcon
                    src="https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_combination_sm.png"
                    alt="img"
                  />
                </NavLogo>
                <NavMenu show={showMobileMenu}>
                  <NavLink style={navStyle} to="/main">
                    <li>글보기</li>
                  </NavLink>
                  <NavLink style={navStyle} to="/hall">
                    <li>명예의전당</li>
                  </NavLink>
                  <NavLink style={navStyle} to="/event">
                    <li>이벤트</li>
                  </NavLink>
                </NavMenu>
              </div>
              <div className="gnb-right">
                {/*로그인을 하지 않았을 경우*/}
                <LoginMenu
                  show={showMobileMenu}
                  className="logout"
                  isOpen={!isLogin}
                >
                  <NavLink style={navStyle} to="/login">
                    <li>로그인</li>
                  </NavLink>
                  <NavLink style={navStyle} to="/signup">
                    <li>회원가입</li>
                  </NavLink>
                </LoginMenu>
                {/*로그인을 했을 경우*/}
                <LoginMenu className="login" isOpen={isLogin}>
                  <Profile
                    onClick={handleTooltipClick}
                    image={
                      userName === 'joanna'
                        ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member2.jpeg'
                        : userName === 'sol-namoo'
                        ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member1.jpg'
                        : userName === 'jaeyoungkim'
                        ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member3.png'
                        : userName === 'AhnHyungJoon'
                        ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member4.png'
                        : 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png'
                    }
                    author={userName}
                  ></Profile>
                  <ProfileTooltip isOpen={showTooltip} ref={tooltipRef}>
                    <ul>
                      <li>
                        <button type="button" onClick={handleMypage}>
                          마이페이지
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={handleLogout}>
                          로그아웃
                        </button>
                      </li>
                    </ul>
                  </ProfileTooltip>
                </LoginMenu>
              </div>
            </NavContainer>
          </Col>
        </Row>
      </Container>
      <MobileMenu isOpen={showMobileMenu}>
        <MobileBackground />
        <div className="mobile_container">
          {/*로그인을 하지 않았을 경우*/}
          <LoginMenu
            className="gnb_mobile_logout"
            show={showMobileMenu}
            isOpen={!isLogin}
          >
            <NavLink style={navStyle} to="/login" className="mobile">
              <li>로그인</li>
            </NavLink>
            <NavLink style={navStyle} to="/signup" className="mobile">
              <li>회원가입</li>
            </NavLink>
          </LoginMenu>
          {/*로그인을 했을 경우*/}
          {isLogin ? (
            <div className="gnb_mobile_login">
              <Profile
                isOpen={isLogin}
                image={
                  userName === 'joanna'
                    ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member2.jpeg'
                    : userName === 'sol-namoo'
                    ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member1.jpg'
                    : userName === 'jaeyoungkim'
                    ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member3.png'
                    : userName === 'AhnHyungJoon'
                    ? 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/member4.png'
                    : 'https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png'
                }
                author={userName}
              ></Profile>
              <ul className="gnb_mobile_login_menu">
                <li>
                  <button type="button" onClick={handleMypage}>
                    마이페이지
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>
          ) : null}
          <NavMenu show={showMobileMenu}>
            <NavLink style={navStyle} to="/main" className="mobile">
              <li>글보기</li>
            </NavLink>
            <NavLink style={navStyle} to="/hall" className="mobile">
              <li>명예의전당</li>
            </NavLink>
            <NavLink style={navStyle} to="/event" className="mobile">
              <li>이벤트</li>
            </NavLink>
          </NavMenu>
        </div>
      </MobileMenu>
      {/*모바일 메뉴 열림 버튼*/}
      <MobileIcon onClick={handleMenuClick}>
        {showMobileMenu ? <FaTimes /> : <CgMenuRight />}
      </MobileIcon>
    </Wrapper>
  )
}

export default Gnb
