import styled from 'styled-components'
import { Container } from '../../styles/responsive'
import theme from '../../styles/theme'
import { Input } from '../../styles/globalStyles'

export const CommentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  color: ${theme.primary};
  margin: 10px 0 100px 0;
  .not {
    margin: 5px 0;
    padding: 50px 20px;
    border: 1px solid ${theme.border};
    border-radius: 5px;
  }
  article {
    border-bottom: 2px solid ${theme.border};
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .comment {
      display: flex;
      flex-grow: 1;
      align-items: center;
      margin: 10px 0;
      .img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        background-color: ${theme.violet_l};
        border-radius: 30px;
        background-image: url('https://goalimage.s3.ap-northeast-2.amazonaws.com/images/logo_symbol.png');
        background-size: 23px;
        background-position: center;
        background-repeat: no-repeat;
      }
      h4 {
        display: inline;
        margin-right: 5px;
      }
      span {
        color: ${theme.secondary};
      }
      p {
        padding: 5px 0;
      }
      .dot {
        padding: 0 5px;
      }
    }
    .comment.edit {
      background-color: ${theme.background};
    }
  }
`
export const CommentCreateContainer = styled(Container)`
  display: flex;
  align-items: center;
`
export const CommentInput = styled(Input)`
  border: 1px solid ${theme.border};
  padding: 10px 10px;
  border-radius: 10px;
`
export const CommentContent = styled.div`
  width: 100%;
`
export const EmojiPickerBox = styled.div`
  position: absolute;
  margin-top: 40px;
  right: 15%;
`
export const NewInput = styled(Input)`
  border-bottom: 2px solid ${theme.border};
  /* width: auto; */
  display: inline-block;
  background-color: ${theme.background};
  padding: 5px 0;
`
