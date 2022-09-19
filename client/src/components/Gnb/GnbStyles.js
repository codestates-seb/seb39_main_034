import styled from 'styled-components'
import { Container } from '../../styles/globalStyles'
import { Link } from 'react-router-dom'

export const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.f_md};
  width: 100%;
  transition: background-color 0.3s ease-in;
`

export const NavContainer = styled(Container)`
  display: flex;
  justify-content: start;
`

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  z-index: 1;
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
  @media screen and (max-width: 960px) {
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
    background-color: #071c2f;
  }
  > a {
    margin-right: 8px;
    &:first-child {
      margin-left: 12px;
    }
  }
`

export const LoginMenu = styled(NavMenu)`
  > a {
    margin-right: 8px;
    &:first-child {
      margin-left: auto;
    }
  }
`

export const MobileIcon = styled.div`
  display: none;
  z-index: 50;
  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`
