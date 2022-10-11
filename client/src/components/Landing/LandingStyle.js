import styled from 'styled-components'
import theme from '../../styles/theme'

const Dot = ({ num, scrollIndex }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        border: '1px solid black',
        borderRadius: 50,
        backgroundColor: scrollIndex === num ? 'black' : 'transparent',
        transitionDuration: 1000,
        transition: 'background-color 0.5s',
      }}
    ></div>
  )
}
export const Dots = ({ scrollIndex }) => {
  return (
    <DotsBase>
      <div className="dots">
        <Dot num={1} scrollIndex={scrollIndex}></Dot>
        <Dot num={2} scrollIndex={scrollIndex}></Dot>
        <Dot num={3} scrollIndex={scrollIndex}></Dot>
        <Dot num={4} scrollIndex={scrollIndex}></Dot>
      </div>
    </DotsBase>
  )
}
const DotsBase = styled.div`
  position: fixed;
  top: 50%;
  right: 20px;
  .dots {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 20px;
    height: 100px;
  }
`
export const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  .row {
    border: 1px solid blue;
  }
`
export const BannerContainer = styled.section`
  height: 100vh;
  font-size: 16px;
  background: url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80');
  background-size: auto 150%;
  background-repeat: no-repeat;
  background-position: center;
  > p {
    width: 50%;
    position: relative;
    top: 38%;
    left: 18%;
    color: ${({ theme }) => theme.dark};
    font-size: 3.8rem;
    line-height: 6rem;
    font-weight: 500;
    animation: slide 1s ease-out;
    @keyframes slide {
      from {
        top: 18%;
        opacity: 10%;
      }
      to {
        top: 38%;
        opacity: 100%;
      }
    }
    @media screen and (max-width: ${({ theme }) => theme.smBreakpoint}) {
      font-size: 3rem;
      line-height: 5rem;
    }
  }
  animation: up-down 1.5s infinite ease-in-out alternate;
  @keyframes up-down {
    from {
      background-position: 50% 50%;
    }
    to {
      background-position: 50% 53%;
    }
  }
`

export const Concept = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin: 50px 0;
    font-size: ${({ theme }) => theme.font36};
  }
  .diagramm {
    position: relative;
    width: 100%;
    height: 180px;
    div {
      position: absolute;
      width: 45%;
      height: 180px;
      border-radius: 100px;
      border: 2px solid ${({ theme }) => theme.tertiary};
    }
    .outer {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      box-shadow: 2px 2px 5px ${({ theme }) => theme.border};
      text-align: center;
      line-height: 1.5em;
      font-size: ${({ theme }) => theme.font20};
      font-weight: 500;
      > p {
        z-index: 3;
      }
    }
    #outer1 {
      left: 10%;
      animation: ${({ show }) => (show ? 'fromleft 1.4s ease-out' : null)};
    }
    #outer2 {
      right: 10%;
      animation: ${({ show }) => (show ? 'fromright 1.4s ease-out' : null)};
    }
    .mwrap {
      position: absolute;
      overflow: hidden;
      pointer-events: none;
      /* background-color: aliceblue; */
      z-index: 1;
      left: 10%;
      animation: ${({ show }) => (show ? 'fromleft 1.4s ease-out' : null)};
    }
    //outer2 위치에 있으면서 outer1 위치와 겹치는 부분만 보여짐
    .mid {
      position: static;
      width: 100%;
      margin-left: 78%;
      margin-top: -2px;
      background-color: ${({ theme }) => theme.violet_l};
      pointer-events: auto;
      z-index: 2;
      animation: ${({ show }) => (show ? 'fadein 1.4s ease-out' : null)};
      @keyframes fadein {
        from {
          opacity: 10%;
          margin-left: 125%;
        }
        to {
          opacity: 90%;
          margin-left: 78%;
        }
      }
    }
    @keyframes fromleft {
      from {
        left: 0%;
      }
      to {
        left: 10%;
      }
    }
    @keyframes fromright {
      from {
        right: 0%;
      }
      to {
        right: 10%;
      }
    }
  }
`
export const FeaturesContainer = styled.section`
  /* width: 100%; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.border};
  h2 {
    margin: 30px 20px;
  }
  .feature__content {
    display: flex;
    align-items: center;
    .tabmenu {
      display: flex;
      flex-direction: column;
      justify-items: center;
      flex-grow: 1;
      .submenu {
        width: 100% auto;
        padding: 15px 10px;
        margin: 5px 30px;
        cursor: pointer;
        border: ${theme.border};
        border-radius: 10px;
        outline: none;
        .subicon {
          padding: 10px;
          display: none;
        }
        .focused {
          display: inline-block;
          padding: 10px;
        }
      }
      .focused {
        background-color: ${theme.violet_m};
        font-weight: bold;
      }
    }
    .tabimg {
      margin: 5px 30px;
      width: 45%;
      height: 60vh;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.25);
      background-color: white;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
`

export const MemberContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  h2 {
    margin: 30px 20px;
  }
  > div {
    margin-top: 150px;
  }
  .slide {
    display: flex;
    justify-content: center;
    align-items: center;
    .window {
      background: white;
      border: 1px solid ${theme.border};
      width: 450px;
      height: 450px;
      overflow: hidden;
      .flexbox {
        display: flex;
        align-items: center;
        width: 100%;
        height: 450px;
        /* border: 1px solid red; */
        .img {
          width: 100%;
          height: 450px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: none;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          overflow: hidden;
          p {
            padding: 5px;
          }
          img {
            width: 100%;
            height: 400px;
          }
        }
      }
    }

    .btn {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 3.3rem;
      color: gray;
      padding: 0 10px;
      border: none;
      outline: none;
      margin: 5px;
      border-radius: 5px;
      background-color: ${theme.violet_d};
      color: ${theme.white};
    }
  }

  .position {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }

  .dot {
    background: lightgray;
    border-radius: 100%;
    height: 10px;
    width: 10px;
  }
  .dot + .dot {
    margin-left: 20px;
  }

  .current {
    background: gray;
  }
`
export const FooterContainer = styled.div`
  background-color: ${theme.violet_d};
  width: 100%;
  height: 300px;
`
