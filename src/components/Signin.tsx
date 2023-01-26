import { useRef } from 'react';
import { Col, Input } from 'antd';
import * as S from './Signin.styles';

import { LoginReqType } from '../types';

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin = ({ login }: SigninProps) => {
  // antd의 Input tpye 바인딩
  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  const handleSubmit = () => {
    // antd의 value값은 state에 있음
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;
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
                ref={emailRef}
              />
            </S.InputArea>
            <S.PasswordTitle>
              비밀번호
              <S.Required> *</S.Required>
            </S.PasswordTitle>
            <S.InputArea>
              <S.SigninInput
                type='password'
                autoComplete='current-password'
                ref={passwordRef}
              />
            </S.InputArea>
            <S.ButtonArea>
              <S.SigninButton size='large' onClick={handleSubmit}>
                로그인
              </S.SigninButton>
            </S.ButtonArea>
          </Col>
        </S.SigninContents>
      </Col>
    </S.SigninRow>
  );
};

export default Signin;
