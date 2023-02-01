import { useEffect, useRef } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Col, Input, message } from 'antd';
import * as S from './Signin.styles';

import { LoginReqType } from '../types';

interface SigninProps {
  login: (reqData: LoginReqType) => void;
  error: Error | null;
  loading: boolean;
}

const Signin = ({ login, error, loading }: SigninProps) => {
  // antd의 Input tpye 바인딩
  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  useEffect(() => {
    if (error === null) return;
    // 에러 관련 메세지
    switch (error.message) {
      case 'USER_NOT_EXIST':
        message.error('존재하지 않는 아이디입니다.');
        break;
      case 'PASSWORD_NOT_MATCH':
        message.error('비밀번호가 틀렸습니다.');
        break;
      default:
        message.error('알 수 없는 에러입니다.');
    }
  }, [error]);

  const handleSubmit = () => {
    // antd의 value값은 state에 있음
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;
    login({ email, password });
  };

  return (
    <S.SigninRow align='middle'>
      <S.BgSignin src='/bg_book.jpg' alt='books' />
      <Col span={24}>
        <S.SigninContents>
          <Col span={24}>
            <S.SigninTitle>나만의 책장</S.SigninTitle>
            <S.SigninSubtitle>올해는 책 좀 읽자</S.SigninSubtitle>
            <div />
            <S.SigninUnderline />
            <S.EmailTitle>
              이메일 주소
              <S.Required> *</S.Required>
            </S.EmailTitle>
            <S.InputArea>
              <S.SigninInput
                placeholder='이메일을 입력해주세요.'
                autoComplete='email'
                name='email'
                prefix={<UserOutlined />}
                ref={emailRef}
                defaultValue='mark@test.com'
              />
            </S.InputArea>
            <S.PasswordTitle>
              비밀번호
              <S.Required> *</S.Required>
            </S.PasswordTitle>
            <S.InputArea>
              <S.SigninInput
                placeholder='비밀번호를 입력해주세요.'
                type='password'
                autoComplete='current-password'
                ref={passwordRef}
                defaultValue='fastcampus'
              />
            </S.InputArea>
            <S.ButtonArea>
              <S.SigninButton
                loading={loading}
                size='large'
                onClick={handleSubmit}
                disabled={false}
              >
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
