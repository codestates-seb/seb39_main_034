import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
  }
`

export const NavLogo = styled(Link)`
  width: auto;
  font-size: 2rem;
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
  @media screen and (max-width: ${({ theme }) => theme.smBreakpoint}) {
    flex-direction: column;
    height: 100vh;
    position: fixed;
    padding-top: 30%;
    top: 0;
    left: 0;
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    transform: translateY(${({ show }) => (show ? '0' : '-10px')});
    transition: opacity 0.5s ease;
  }
  a {
    display: inline;
    width: auto;
    margin-right: 12px;
    font-weight: 500;
    &:first-child {
      margin-left: 12px;
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

export const MobileIcon = styled.div`
  display: none;
  z-index: 50;
  @media screen and (max-width: ${({ theme }) => theme.smBreakpoint}) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`
