import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsRefresher, selectToken } from 'redux/Auth/authSelector';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const tokeh = useSelector(selectToken);
  const isRefresched = useSelector(selectIsRefresher);
  const shoutRedirect = !tokeh && !isRefresched;

  return shoutRedirect ? <Navigate to={redirectTo} /> : Component;
};
export default PrivateRoute;
