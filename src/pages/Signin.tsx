import { Navigate } from 'react-router-dom';
import { useToken } from '../hooks/useToken';
import SigninContainer from '../containers/SigninContainer';

const Signin = () => {
  const token = useToken();

  if (token !== null) {
    return <Navigate replace to='/' />;
  }

  return <SigninContainer />;
};

export default Signin;
