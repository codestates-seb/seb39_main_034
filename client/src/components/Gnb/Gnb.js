import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SET_LOGIN, SET_LOGOUT } from '../../redux/authSlice'
import { useState, useRef, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { CgMenuRight } from 'react-icons/cg'
import {
  NavContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  LoginMenu,
  ProfileTooltip,
} from './GnbStyles.js'
import { Profile } from '../Widget/WidgetStyle'

function Gnb() {
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.auth.isLogin)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const tooltipRef = useRef()

  //선택된 메뉴 색상 변경
  const navStyle = ({ isActive }) => ({
    color: isActive ? '#C77DFF' : '#191a20',
  })
  //로그인, 로그아웃 상태 변경
  const handleLogin = () => {
    dispatch(
      SET_LOGIN({
        userName: '최강동안조안나',
        accessToken: '12345678',
      })
    )
  }
  const handleLogout = () => {
    dispatch(SET_LOGOUT())
    setShowTooltip(false)
    navigate('/main')
  }
  //모바일 메뉴 핸들러
  const handleMenuClick = () => {
    setShowMenu(!showMenu)
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

  return (
    <NavContainer>
      <div className="gnb-left">
        <NavLogo to="/">
          <NavIcon src="/logo.png" alt="logo" />
        </NavLogo>
        <NavMenu showMenu={showMenu}>
          <NavLink style={navStyle} to="/main">
            <li>글보기</li>
          </NavLink>
          <NavLink style={navStyle} to="/">
            <li>명예의전당</li>
          </NavLink>
          <NavLink style={navStyle} to="/">
            <li>이벤트</li>
          </NavLink>
          <button onClick={handleLogin}>임시 로그인 버튼</button>
        </NavMenu>
      </div>
      <div className="gnb-right">
        {/*로그인을 하지 않았을 경우*/}
        <LoginMenu showMenu={showMenu} className="logout" isOpen={!isLogin}>
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
              'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            author={'최강동안조안나'}
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
      {/*모바일 사이즈에서 메뉴 열림 버튼*/}
      <MobileIcon onClick={handleMenuClick}>
        {showMenu ? <FaTimes /> : <CgMenuRight />}
      </MobileIcon>
    </NavContainer>
  )
}

export default Gnb
