import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Signin from '../components/Signin';

import { login as loginSagaStart } from '../redux/modules/auth';
import { LoginReqType } from '../types';

const SigninContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useCallback(
    (reqData: LoginReqType) => {
      dispatch(loginSagaStart(reqData));
      if (localStorage.getItem('token')) {
        navigate('/');
      }
    },
    [dispatch, navigate]
  );

  return <Signin login={login} />;
};

export default SigninContainer;
