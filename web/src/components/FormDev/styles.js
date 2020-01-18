import styled from 'styled-components';

export const Container = styled.div`
  width: 320px;
  background: #fff;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 30px 20px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const Strong = styled.strong`
  font-size: 20px;
  text-align: center;
  display: block;
  color: #333;
`;

export const Form = styled.form`
  margin-top: 30px;
`;

export const ContainerInput = styled.div`
  & + div {
    margin-top: 20px;
  }
`;

export const Label = styled.label`
  color: #acacac;
  font-size: 14px;
  font-weight: bold;
  display: block;
`;

export const ContainerIconInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

export const Input = styled.input`
  padding-left: 8px;
  width: 100%;
  height: 32px;
  font-size: 14px;
  color: #666;
  border: 0;
`;

export const ContainerLatLong = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  div {
    margin-top: 0;
  }

  div + div {
    margin-left: 20px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  border: 0;
  margin-top: 30px;
  background: #7d40e7;
  border-radius: 4px;
  padding: 15px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: background 0.5s;

  :hover {
    background: #6431ca;
  }
`;
