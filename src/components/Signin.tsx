import { useRef } from 'react';
import { Button, Col, Input, Row } from 'antd';
import * as S from './Signin.styles';

import { LoginReqType } from '../types';

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin = ({ login }: SigninProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    console.log(email, password);
    login({ email, password });
  };

  return (
    <S.SigninRow align='middle'>
      <Col span={24}>
        <S.SigninContents>
          <Col span={24}>
            <S.SigninTitle>My Books</S.SigninTitle>
            <S.SigninSubtitle>당신의 책 리스트</S.SigninSubtitle>
            <div />
            <S.SigninUnderline />
            <S.EmailTitle>
              이메일 주소
              <S.Required> *</S.Required>
            </S.EmailTitle>
            <S.InputArea>
              <S.SigninInput
                placeholder='Email'
                autoComplete='email'
                name='email'
              />
            </S.InputArea>
            <S.PasswordTitle>
              비밀번호
              <S.Required> *</S.Required>
            </S.PasswordTitle>
            <S.InputArea>
              <S.SigninInput type='password' autoComplete='current-password' />
            </S.InputArea>
            <S.ButtonArea>
              <S.SigninButton size='large'>로그인</S.SigninButton>
            </S.ButtonArea>
          </Col>
        </S.SigninContents>
      </Col>
    </S.SigninRow>
  );
};

export default Signin;
