import React from 'react';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Signin from '../components/Signin';
import { login as loginSagaStart } from '../redux/modules/auth';

const SigninContainer = () => {
  const dispatch = useDispatch();
  const login = useCallback(
    (reqData) => {
      dispatch(loginSagaStart(reqData));
    },
    [dispatch]
  );
  return <Signin login={login} />;
};

export default SigninContainer;
