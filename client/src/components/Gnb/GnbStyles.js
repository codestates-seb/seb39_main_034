import styled from 'styled-components'
import { ModalBackground } from '../../styles/globalStyles'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  z-index: 1;
`
export const NavContainer = styled.div`
  width: 100%;
  height: 92px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  font-size: ${(props) => props.theme.font18};
  transition: background-color 0.3s ease-in;
  .gnb-left {
    display: flex;
    align-items: center;
    height: 92px;
  }
`

export const NavLogo = styled(Link)`
  width: auto;
  /* display: flex;
  justify-self: flex-start;
  align-items: center; */
  z-index: 1;
  cursor: pointer;
`

export const NavIcon = styled.img`
  margin-right: 1rem;
  width: 7rem;
`

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  a {
    display: inline;
    width: auto;
    margin-right: 12px;
    font-weight: 500;
    &:first-child {
      margin-left: 12px;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.smBreakpoint}) {
    flex-direction: column;
    margin-top: 30px;
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    transform: translateY(${({ show }) => (show ? '0' : '-10px')});
    transition: opacity 0.5s ease;
    a.mobile {
      height: 30px;
      margin: 4px 0;
      padding: 4px 8px;
      font-size: ${({ theme }) => theme.font18};
      font-weight: 500;
      line-height: 20px;
      &:active {
        background: ${({ theme }) => theme.background};
      }
    }
  }
`

export const LoginMenu = styled(NavMenu)`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: relative;
  a {
    margin-right: 0px;
    margin-left: 12px;
    &:first-child {
      margin-left: auto;
    }
  }
  div {
    margin-left: auto;
  }
  @media screen and (max-width: ${({ theme }) => theme.smBreakpoint}) {
    padding-top: 30%;
    flex-direction: row;
    justify-content: center;
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    transform: translateY(${({ show }) => (show ? '0' : '-10px')});
    transition: opacity 0.5s ease;
    padding: 30% 30px;
    a.mobile {
      flex-shrink: 0;
      margin: 16px 0;
      padding: 4px 12px;
    }
  }
`

export const ProfileTooltip = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 50px;
  left: 22px;
  transform: translate(-50%, 0);
  width: 120px;
  padding: 12px 8px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.white};
  z-index: 3;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));

  &::before,
  &::after {
    position: absolute;
    top: -17px;
    left: 50%;
    transform: translate(-50%, 0);
    display: block;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 8px solid ${({ theme }) => theme.border};
    content: '';
  }
  &::after {
    top: -16px;
    border-bottom-color: ${({ theme }) => theme.white};
  }

  li {
    height: 36px;
    text-align: center;
    &:first-child {
      button {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
    &:last-child {
      button {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }
  button {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    font-size: ${({ theme }) => theme.font16};
    line-height: 32px;
    font-weight: 400;
    color: ${({ theme }) => theme.dark};
    background: ${({ theme }) => theme.white};
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.background};
    }
  }
`

export const MobileMenu = styled.div`
  display: none;
  @media screen and (max-width: ${({ theme }) => theme.smBreakpoint}) {
    position: absolute;
    ${({ isOpen }) => (isOpen ? 'display: block;' : 'display: none;')}
    top: 0;
    right: 0;
    z-index: 1;
    .mobile_container {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 80vw;
      min-width: 300px;
      height: 100vh;
      margin: 0 0 0 auto;
      padding: 8px 12px;
      background-color: white;
      z-index: 2;
      a,
      button {
        font-size: ${({ theme }) => theme.font18};
      }
      .gnb_mobile_logout {
        margin-top: 80px;
        padding: 30px;
        border-radius: 10px;
        background: ${({ theme }) => theme.background};
      }
      .gnb_mobile_login {
        margin-top: 80px;
        padding: 30px;
        border-radius: 10px;
        background: ${({ theme }) => theme.background};
        > div {
          margin: 20px 0;
          padding: 0x 12px;
          font-weight: 500;
        }
        .gnb_mobile_login_menu {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          button {
            display: block;
            border: none;
            margin: 4px 12px;
            line-height: 32px;
            font-weight: 500;
            color: ${({ theme }) => theme.dark};
            background: ${({ theme }) => theme.background};
            cursor: pointer;
            &:active {
              background: ${({ theme }) => theme.background};
            }
          }
        }
      }
    }
  }
`

export const MobileBackground = styled(ModalBackground)`
  z-index: 1;
`

export const MobileIcon = styled.div`
  display: none;
  z-index: 10;

  @media screen and (max-width: ${({ theme }) => theme.smBreakpoint}) {
    display: block;
    position: absolute;
    top: 46;
    right: 0;
    transform: translate(-100%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`
