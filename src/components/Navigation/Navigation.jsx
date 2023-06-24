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
      <NavLink
        to="home"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : `${css.link}`
        }
      >
        <div className={css.navigationBtn}>
          <AiFillHome className={css.home} />
          {!viewport.mobile && <span>Home</span>}
        </div>
      </NavLink>
      <NavLink
        to="statistic"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : `${css.link}`
        }
      >
        <div className={css.navigationBtn}>
          <TimelineIcon sx={{ fontSize: 24 }} />{' '}
          {!viewport.mobile && <span>Statistics</span>}
        </div>
      </NavLink>

      {viewport.mobile && (
        <NavLink
          to="currency"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : `${css.link}`
          }
        >
          <div className={css.navigationBtn}>
            <AttachMoneyIcon sx={{ fontSize: 24 }} />
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default Navigation;
