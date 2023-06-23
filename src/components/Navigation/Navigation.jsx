import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import TimelineIcon from '@mui/icons-material/Timeline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import css from './Navigation.module.css';
// import VisibleNavLincCurrency from 'components/VisibleNavLincCurrency/VisibleNavLincCurrency';
import { useSelector } from 'react-redux';
import { selectViewPort } from 'redux/Viewport/viewportSelectors';

const Navigation = () => {
  const viewport = useSelector(selectViewPort);

  return (
    <div className={css.navigation}>
      <NavLink to="home">
        <AiFillHome /> Home
      </NavLink>
      <NavLink to="statistic">
        <TimelineIcon /> Statistics
      </NavLink>
      {/* <VisibleNavLincCurrency> */}
      {viewport.mobile && (
        <NavLink to="currency">
          {' '}
          <AttachMoneyIcon />
        </NavLink>
      )}
      {/* </VisibleNavLincCurrency> */}
    </div>
  );
};

export default Navigation;
