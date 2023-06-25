import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectToken } from 'redux/Auth/authSelector';

const PublicRoute = ({ component: Component, redirectTo = '/' }) => {
  const token = useSelector(selectToken);

  return token ? <Navigate to={redirectTo} /> : Component;
};

export default PublicRoute;
