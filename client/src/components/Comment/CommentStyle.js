import styled from 'styled-components'
import { Container } from '../../styles/responsive'
import theme from '../../styles/theme'

export const CommentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
  z-index: -1;
  article {
    display: flex;
    border-bottom: 2px solid ${theme.border};
    padding: 20px 0;
  }
`
export const CommentCreateContainer = styled(Container)`
  display: flex;
  border-bottom: 2px solid ${theme.border};
`
export const CommentContent = styled.div`
  width: 100%;
`
