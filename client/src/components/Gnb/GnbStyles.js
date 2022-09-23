import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NavContainer = styled.div`
  width: 100%;
  height: 92px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  font-size: ${(props) => props.theme.font18};
  transition: background-color 0.3s ease-in;
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
  width: 3rem;
`

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  width: 100%;
  @media screen and (max-width: ${({ theme }) => theme.smBreakpoint}) {
    flex-direction: column;
    width: 100%;
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
  > a {
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
  > a {
    display: inline;
    margin-right: 0px;
    margin-left: 12px;
    &:first-child {
      margin-left: auto;
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
