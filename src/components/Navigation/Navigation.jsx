import { NavLink } from 'react-router-dom';

import css from './Navigation.module.css';
// import VisibleNavLincCurrency from 'components/VisibleNavLincCurrency/VisibleNavLincCurrency';
import { useSelector } from 'react-redux';
import { selectViewPort } from 'redux/Viewport/viewportSelectors';

const Navigation = () => {
  const viewport = useSelector(selectViewPort);
  console.log('viewport', viewport);
  return (
    <div className={css.navigation}>
      <NavLink to="home">Home</NavLink>
      <NavLink to="statistic">Statistics</NavLink>
      {/* <VisibleNavLincCurrency> */}
      {viewport.mobile && <NavLink to="currency">Currency</NavLink>}
      {/* </VisibleNavLincCurrency> */}
    </div>
  );
};

export default Navigation;
