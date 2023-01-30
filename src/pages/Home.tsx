import { Navigate } from 'react-router-dom';
import { useToken } from '../hooks/useToken';
import { ListContainer } from '../containers/ListContainer';

const Home = () => {
  const token = useToken();

  if (token === null) {
    return <Navigate replace to='/signin' />;
  }

  return <ListContainer />;
};

export default Home;
