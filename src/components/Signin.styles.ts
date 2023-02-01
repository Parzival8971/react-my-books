import styled from '@emotion/styled';
import { Button, Input, Row } from 'antd';

export const SigninRow = styled(Row)`
  height: 100vh;
  background: #f6f5ef;
  position: relative;
`;

export const SigninContents = styled(Row)`
  max-width: 560px;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: white;
  padding: 60px 0px;
  box-shadow: 0 1rem 2rem hsl(0 0% 0% / 100%);
  font-family: 'KyoboHand', sans-serif;
`;

export const SigninTitle = styled.div`
  text-align: center;
  font-size: 60px;
  font-weight: bold;
  color: #006633;
  text-transform: uppercase;
`;

export const SigninSubtitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const SigninUnderline = styled.div`
  width: 80px;
  height: 3px;
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 40px;
  border-radius: 20%;
  background: linear-gradient(to right, #996633, #006633);
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
  border-color: #006633;
  background-color: #006633;
  text-transform: uppercase;
  border: none;
  outline: none;
  border-radius: 10px;
  color: white;
  width: 100%;
  font-weight: 700;
  &:hover {
    color: white;
    border-color: #006633;
    background-color: #006633;
    text-decoration: underline;
  }
`;

export const BgSignin = styled.img`
  position: absolute;
  width: 100%;
  object-fit: cover;
  margin: auto;
  display: block;
`;
