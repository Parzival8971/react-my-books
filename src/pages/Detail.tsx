import { Navigate } from 'react-router-dom';
import DetailContainer from '../containers/DetailContainer';
import { useToken } from '../hooks/useToken';

const Detail = () => {
  const token = useToken();

  if (token === null) {
    return <Navigate replace to='/signin' />;
  }
  return <DetailContainer />;
};

export default Detail;
