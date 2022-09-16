import styled from 'styled-components'
import { Container, TextWrapper } from '../../styles/globalStyles'
import theme from '../../styles/theme'

export const TimelineContainer = styled(Container)`
  > article {
    border: 1px solid red;
    margin: 10px 0;
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
  .contents__timeline {
    .contents {
    }
  }
`
export const TimelineReviewContainer = styled(TimelineContainer)`
  border: 1px solid red;
`

export const Text = styled(TextWrapper)`
  color: ${theme.dark};
  font-size: ${theme.font18};
  line-height: 60px;
  margin-left: 10px;
`
export const Icon = styled.div`
  cursor: pointer;
  color: ${theme.tertiary};

  &:nth-child(1) {
    padding: 20px;
  }
  &:nth-child(2) {
    padding: 10px;
  }
`
