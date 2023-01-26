import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ListContainer } from '../containers/ListContainer';

import { RootState } from '../redux/modules/rootReducer';

const Home = () => {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );

  if (token === null) {
    return <Navigate replace to='/signin' />;
  }

  return <ListContainer />;
};

export default Home;
