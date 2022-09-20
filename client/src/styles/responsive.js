import styled from 'styled-components'

// MOBILE (<576px) --------------------------------------
// fixture------------------sm
// num of columns-----------4
// gutter ----------------20px
// margin ---------------- 5px
// container ------------ 100% - (5px *2)

// Desktop (>576px) --------------------------------------
//fixture-------------------lg
// num of columns-----------12
// unit-------------------75px
// gutter ----------------20px
// margin --------------- auto
// container ------------ 1140px
// max-container-width -- 1140px

const lgColumns = 12
const lgUnit = 75

const breakpoint = 576

const smColumns = 4
const smMargin = 5

const gutter = 20
const lgMaxContainer = 1140

export const Container = styled.div`
  width: 100%;
  max-width: ${lgMaxContainer}px;
  margin: 0 auto;
  @media screen and (max-width: ${breakpoint}px) {
    padding: 0 ${smMargin}px;
  }
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justify }) => (justify ? justify : '')};
  align-items: ${({ align }) => (align ? align : '')};
  gap: ${({ gap }) => (gap ? gap : '')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: 0 10px;
  position: ${({ position }) => (position ? position : '')};
  width: ${({ width }) => (width ? width : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 'auto')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 'auto')};
  flex-wrap: ${({ wrap }) => (wrap ? wrap : '')};
`

export const Col = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : '')};
  justify-content: ${({ justify }) => (justify ? justify : '')};
  align-items: ${({ align }) => (align ? align : '')};
  padding: 0 ${gutter / 2}px;
  margin: ${({ margin }) => (margin ? margin : '')};
  position: ${({ position }) => (position ? position : '')};
  width: ${({ lg }) =>
    lg ? lg * (lgUnit + gutter) : lgColumns * (lgUnit + gutter)}px;
  /* width: ${({ lg }) => (lg ? (lg / lgColumns) * 100 : 100)}%; */
  min-width: ${lgColumns * (lgUnit + gutter)};
  height: ${({ height }) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 'auto')};
  @media screen and (max-width: ${breakpoint}px) {
    width: ${({ sm }) => (sm / smColumns) * 100}%;
  }
`
