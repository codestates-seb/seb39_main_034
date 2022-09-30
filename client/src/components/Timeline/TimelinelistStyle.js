import styled from 'styled-components'
import {
  Container,
  ModalBackground,
  ModalWrapper,
  TextWrapper,
  Textarea,
} from '../../styles/globalStyles'
import theme from '../../styles/theme'

// ~~~ Timeline style ~~~ //
export const TimelineList = styled(Container)``
export const TimelineContainer = styled(Container)`
  > article {
    margin: 10px 0;
    border: 1px solid ${theme.border};
    border-radius: 10px;
  }
  .header__timeline {
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color: ${theme.violet_l};
    border-radius: 10px 10px 0 0;

    .header__timeline--icon {
      display: flex;
    }
  }
  .header__create-timeline--icon {
    display: flex;
    justify-content: end;
    border-bottom: 1px solid ${theme.border};
  }
  .header__editor {
    display: flex;
    justify-content: end;
    height: 60px;
    border-bottom: 1px solid ${theme.tertiary};
  }
  .contents__timeline {
    color: ${theme.primary};
    /* border: 1px solid red; */
    .filenames {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 20px;
      background-color: ${theme.border_l};
      box-shadow: 0px 2px 5px ${theme.border};
      .filename span {
        font-weight: bold;
        margin: 0 0 0 10px;
      }
      .button__complete {
        display: flex;
        align-items: center;
        span {
          color: ${theme.primary};
        }
      }
    }
    .contents {
      padding: 30px 20px;

      .contents__img {
        width: 300px;
        display: block;
      }
    }
    .button__complete {
      padding: 10px;
      text-align: end;
    }
  }
  .header__timeline.review {
    background-color: ${theme.yellow};
    border: 1px solid ${theme.border};
  }
  .contents__timeline.review {
    border: 1px solid ${theme.border};
  }
`

// ~~~ TimelineModal style ~~~ //
export const Wrapper = styled(ModalWrapper)`
  display: flex;
  align-items: center;
`
export const ModalBackgroundBlack = styled(ModalBackground)``

export const TimelineModalContainer = styled(Container)`
  background-color: ${theme.white};
  border-radius: 10px;
  width: 1000px;
  height: 600px;
  z-index: 10;

  .header__timeline {
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color: ${theme.violet_l};
    border-radius: 10px 10px 0 0;
  }
  .modal {
    background-color: ${theme.violet_m};
  }
  .header__editor {
    display: flex;
    justify-content: end;
    height: 60px;
    border-bottom: 1px solid ${theme.tertiary};
  }
  .contents__timeline {
    overflow: hidden;
    .contents {
      > div {
        padding: 0 20px;
        height: 470px;
        overflow-y: scroll;
        ::-webkit-scrollbar {
          width: 25px;
          border-radius: 5px;
          background-color: ${theme.border_l};
        }
        ::-webkit-scrollbar-button {
          display: none;
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${theme.violet_l};
          border-radius: 10px;
          border: 1px solid ${theme.border_l};
        }
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px ${theme.border};
          border-radius: 10px;
        }
      }
    }
    .button__complete {
      display: flex;
      justify-content: end;
    }
  }
`

// ~~~ PUBLIC style ~~~ //
export const Text = styled(TextWrapper)`
  color: ${theme.dark};
  font-size: ${theme.font18};
  line-height: 60px;
  margin-left: 10px;
`

export const TimelineTextarea = styled(Textarea)`
  width: 100%;
  height: auto;
  font-size: 16px;
  padding: 10px;
`

export const EmojiPickerBox = styled.div`
  position: absolute;
  margin-left: -250px;
  /* border: 1px solid red; */
  z-index: 1;
`
export const ImageBox = styled.div`
  position: absolute;
  margin-left: -250px;
  border: 1px solid ${theme.border};
  background-color: ${theme.white};
  border-radius: 5px;
  padding: 10px;
  z-index: 1;
`
