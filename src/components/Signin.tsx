import { useRef } from 'react';

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

  return <>d</>;
};

export default Signin;
