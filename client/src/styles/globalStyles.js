import styled, { createGlobalStyle } from 'styled-components'
import { Container, Row, Col } from './responsive'

const GlobalStyle = createGlobalStyle`

*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center, dl, dt, dd,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    /* color: ${({ theme }) => theme.dark}; */
    text-decoration: none;
}
ol, ul, li{
    vertical-align: baseline;
    text-decoration: none;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
h3{
  margin: 20px 0;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
html{
  font-family: 'IBM Plex Sans KR', sans-serif;
}
a{
  display: 'inline-block';
}
`

export const MainHeading = styled.h1`
  font-size: clamp(2.3rem, 6vw, 4.5rem);
  margin-bottom: 2rem;
  color: ${({ color }) => (color ? color : (props) => props.theme.primary)};
  width: 100%;
  letter-spacing: 4px;
  text-align: left;
  padding: ${({ padding }) =>
    padding ? padding : (props) => props.theme.primary};
`

export const Heading = styled.h2`
  font-size: clamp(1.3rem, 13vw, 3.1rem);
  margin: ${({ margin }) => (margin ? margin : '')};
  margin-bottom: ${({ mb }) => (mb ? mb : '')};
  margin-top: ${({ mt }) => (mt ? mt : '')};
  color: ${({ inverse }) => (inverse ? '$403ae3' : '#fff')};
  letter-spacing: 0.4rem;
  line-height: 1.06;
  text-align: center;
  width: ${({ width }) => (width ? width : '100%')};
`
export const HeadingH3 = styled.h3`
  font-size: clamp(1.3rem, 13vw, 1.4rem);
  margin: ${({ margin }) => (margin ? margin : '')};
  margin-bottom: ${({ mb }) => (mb ? mb : '')};
  margin-top: ${({ mt }) => (mt ? mt : '')};
  color: ${({ color }) => (color ? (props) => props.theme.primary : '#fff')};
  letter-spacing: 0.4rem;
  line-height: 1.06;
  text-align: start;
  width: ${({ width }) => (width ? width : '100%')};
`
export const TextWrapper = styled.span`
  color: ${({ color }) => (color ? color : '')};
  font-size: ${({ size }) => (size ? size : '')};
  font-weight: ${({ weight }) => (weight ? weight : '')};
  letter-spacing: ${({ spacing }) => (spacing ? spacing : '')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  margin-bottom: ${({ mb }) => (mb ? mb : '')};
  margin-top: ${({ mt }) => (mt ? mt : '')};
`

export const Section = styled.section`
  padding: ${({ padding }) => (padding ? padding : '140px 0')};
  margin: ${({ margin }) => (margin ? margin : '')};
  background: ${({ inverse }) => (inverse ? 'white' : '#071c2f')};
  position: ${({ position }) => (position ? position : '')};
  width: ${({ width }) => (width ? width : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 'auto')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 'auto')};
`

export const Button = styled.button`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  white-space: wrap;
  font-size: ${(props) => props.theme.font16};
  color: ${(props) => props.theme.white};
  background: ${(props) => (props.bg ? props.bg : props.theme.violet_m)};
  filter: drop-shadow(0px 1px 3px rgba(115, 115, 115, 0.25));
  outline: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  &:hover {
    background: ${(props) => (props.hover ? props.hover : '')};
  }
`
export const ModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export const ModalBackground = styled(ModalWrapper)`
  background-color: ${(props) => props.theme.black};
  opacity: 0.2;
  z-index: 1;
`
export const Input = styled.input`
  width: 100%;
  height: auto;
  border: none;
  outline: none;
  line-height: 16px;
  font-size: 16px;
  color: ${(props) => props.theme.primary};
`

export const Textarea = styled.textarea`
  border: none;
  outline: none;
  resize: none;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.violet_l};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.border};
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`
export const Icon = styled.div`
  padding: 20px 10px;
`
/* 칼럼 그리드 컴포넌트들은 내용이 길어서 responsive.js에서 설정함
improt한 후 그대로 export함*/
export { Container, Row, Col }

export default GlobalStyle
