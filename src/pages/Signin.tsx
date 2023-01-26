import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import SigninContainer from '../containers/SigninContainer';

import { RootState } from '../redux/modules/rootReducer';

const Signin = () => {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );

  if (token !== null) {
    return <Navigate replace to='/' />;
  }

  return <SigninContainer />;
};

export default Signin;
