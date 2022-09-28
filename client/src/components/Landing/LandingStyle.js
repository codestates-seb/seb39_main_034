import styled from 'styled-components'
import theme from '../../styles/theme'

export const Wrapper = styled.div`
  /* border: 1px solid red; */
  .row {
    border: 1px solid blue;
  }
`
export const BannerContainer = styled.section`
  height: 90vh;
  background: url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80');
  background-size: auto 150%;
  background-repeat: no-repeat;
  background-position: center;
  > p {
    width: 50%;
    position: relative;
    top: 38%;
    left: 18%;
    font-size: ${({ theme }) => theme.font36};
    line-height: 1.4em;
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
  }
  animation: up-down 1.5s infinite ease-in-out alternate;
  @keyframes up-down {
    from {
      background-position: 50% 50%;
    }
    to {
      background-position: 50% 60%;
    }
  }
`

export const Concept = styled.section`
  width: 100%;
  height: 100vh;
  padding: 100px 4px;
  > h2 {
    margin: 60px auto;
    text-align: center;
    font-size: ${({ theme }) => theme.font36};
  }
  .diagramm {
    /* display: flex;
    justify-content: center; */
    position: relative;
    width: 100%;
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
      animation: fromleft 1.4s ease-out;
    }
    #outer2 {
      right: 10%;
      animation: fromright 1.4s ease-out;
    }
    .mwrap {
      position: absolute;
      overflow: hidden;
      pointer-events: none;
      /* background-color: aliceblue; */
      z-index: 1;
      left: 10%;
      animation: fromleft 1.4s ease-out;
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
      animation: fadein 1.4s ease-out;
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
  width: 100%;
  height: 780px;
  /* border: 1px solid red; */
  background-color: ${theme.border};
  overflow: hidden;
  h2 {
    margin: 30px 20px;
  }
  .feature__content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 780px;
    /* border: 1px solid red; */
    .tabmenu {
      display: flex;
      flex-direction: column;
      justify-items: center;
      /* align-items: center; */
      flex-grow: 1;
      /* border: 1px solid red; */
      .submenu {
        width: 100% auto;
        padding: 15px 10px;
        margin: 5px 30px;
        cursor: pointer;
        border: ${theme.border};
        border-radius: 10px;
        outline: none;
        .subicon {
          /* border: 1px solid yellow; */
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
      /* border: 1px solid red; */
      margin: 5px 30px;
      width: 45%;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.25);
      img {
        width: 100%;
      }
    }
  }
`

export const MemberContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 780px;
  /* border: 1px solid red; */
  .slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .window {
      background: white;
      border: 1px solid ${theme.border};
      width: 450px;
      height: 450px;

      overflow: hidden;
      /* border: 1px solid red; */
      .flexbox {
        display: flex;
        .img {
          width: 450px;
          height: 250px;
          background-position: 50% 50%;
          background-size: contain;
          background-repeat: no-repeat;
          flex: none;
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
