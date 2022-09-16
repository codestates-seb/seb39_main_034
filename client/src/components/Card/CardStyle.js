import styled from 'styled-components'

export const CategoryTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 35px;
  border-radius: 30px;
  color: ${({ theme }) => theme.white};
  font-size: ${(props) => props.theme.font16};
  background: ${({ theme }) => theme.violet_m};
  filter: drop-shadow(0px 1px 3px rgba(115, 115, 115, 0.25));
`
