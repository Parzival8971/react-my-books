import styled from '@emotion/styled';
import { Button, Input, Row } from 'antd';

export const SigninRow = styled(Row)`
  height: 100vh;
`;

export const SigninContents = styled(Row)`
  width: 360px;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  background-color: #f6f6f6;
  padding: 60px 0px;
  box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);
`;

export const SigninTitle = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #212121;
  text-transform: uppercase;
`;

export const SigninSubtitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const SigninUnderline = styled.div`
  width: 120px;
  height: 3px;
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 40px;
  border-radius: 5px;
  background: linear-gradient(to right, #4455ff, #8055dd);
`;

export const Required = styled.span`
  color: #971931;
`;

export const EmailTitle = styled.span`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  padding-left: 40px;
`;

export const InputArea = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
`;

export const SigninInput = styled(Input)`
  width: 100%;
  border-radius: 1px;
  border-width: 1px;
  font-family: Roboto;
  border-radius: 6px;
`;

export const PasswordTitle = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  padding-left: 40px;
`;

export const ButtonArea = styled.div`
  text-align: center;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 20px;
`;

export const SigninButton = styled(Button)`
  border-color: #2455ff;
  background-color: #4455ff;
  text-transform: uppercase;
  border-radius: 10px;
  border-width: 2px;
  color: white;
  width: 100%;
  font-weight: 700;
`;
