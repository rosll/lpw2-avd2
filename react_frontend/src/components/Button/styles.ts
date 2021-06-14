import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`

  background: #0a8c10;
  height: 38px;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  color: #fff;
  width: 15%;
  font-weight: 500;
  margin-top: 16px;
  margin-left: 30%;
  transition: background-color 0.2s;
  margin-right: 5px;
  font-size: 15px;
  &:hover {
    background: ${shade(0.2, '#1ceb26')}
  }
`;
