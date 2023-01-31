import { Navigate } from 'react-router-dom';
import { useToken } from '../hooks/useToken';
import EditContainer from '../containers/EditContainer';

const Edit = () => {
  const token = useToken();

  if (token === null) {
    return <Navigate replace to='/signin' />;
  }
  return <EditContainer />;
};

export default Edit;
