import styled, { css } from 'styled-components';


interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`

  background: #fff;
  border: 1px solid #232129;
  padding: 9px;
  margin-left: 30%;
  width: 40%;
  color: #333;
  border-radius: 8px;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 15px;
  }

  ${(props) => props.isErrored
    && css`
      border-color: #c53030;
    `}

  ${(props) => props.isFocused
    && css`
      border-color: #1ceb26;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #333;

    &::placeholder {
      color: #a6a6a6;
    }
  }

`;

