import styled from 'styled-components'

// MOBILE (<586px) --------------------------------------
// fixture------------------sm
// num of columns-----------4
// gutter ----------------20px
// margin ---------------- 5px
// container ------------ 100% - (5px *2)

// Tablet (586px< , <860px) --------------------------------------
// fixture------------------md
// num of columns-----------12
// gutter ----------------20px
// margin --------------- 20px
// container ------------ 100% - (20px *2)
// max-container-width -- 820px

// Desktop (>860px) --------------------------------------
//fixture-------------------lg
// num of columns-----------12
// unit-------------------75px
// gutter ----------------20px
// margin --------------- auto
// container ------------ 1140px
// max-container-width -- 1140px

const lgColumns = 12
const gutter = 20
const lgMaxContainer = 1140

const mdColumns = 12
const mdBreakpoint = 860
const mdMargin = 20

const smBreakpoint = 586
const smColumns = 4
const smMargin = 5

export const Container = styled.div`
  width: 100%;
  max-width: ${lgMaxContainer + 20}px;
  margin: 0 auto;

  @media screen and (max-width: ${mdBreakpoint}px) {
    padding: 0 ${mdMargin}px;
  }
  @media screen and (max-width: ${smBreakpoint}px) {
    padding: 0 ${smMargin}px;
  }
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => (direction ? direction : '')};
  justify-content: ${({ justify }) => (justify ? justify : '')};
  align-items: ${({ align }) => (align ? align : '')};
  gap: ${({ gap }) => (gap ? gap : '')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: 0 10px;
  margin-top: ${({ mt }) => (mt ? mt : '')};
  position: ${({ position }) => (position ? position : '')};
  width: ${({ width }) => (width ? width : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 'auto')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 'auto')};
  flex-wrap: ${({ wrap }) => (wrap ? wrap : '')};
  @media screen and (max-width: ${mdBreakpoint}px) {
    margin: 0;
  }
`

export const Col = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : '')};
  justify-content: ${({ justify }) => (justify ? justify : '')};
  align-items: ${({ align }) => (align ? align : '')};
  padding: ${({ padding }) => (padding ? padding : '0')}px ${gutter / 2}px;
  margin: ${({ margin }) => (margin ? margin : '')};
  position: ${({ position }) => (position ? position : '')};
  width: ${({ lg }) => (lg ? (lg / lgColumns) * 100 : 100)}%;
  height: ${({ height }) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 'auto')};
  > a {
    width: ${({ anchor }) => (anchor ? anchor : '')};
  }
  @media screen and (max-width: ${mdBreakpoint}px) {
    width: ${({ md }) => (md ? (md / mdColumns) * 100 : 100)}%;
  }
  @media screen and (max-width: ${smBreakpoint}px) {
    width: ${({ sm }) => (sm ? (sm / smColumns) * 100 : 100)}%;
  }
`
