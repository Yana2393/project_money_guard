import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import TimelineIcon from '@mui/icons-material/Timeline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import css from './Navigation.module.css';

import { useSelector } from 'react-redux';
import { selectViewPort } from 'redux/Viewport/viewportSelectors';
import { useState } from 'react';
import Balance from 'components/Balance/Balance';
import NavLinkNavigate from 'components/NavLinkNavigate/NavLinkNavigate';

const Navigation = () => {
  const viewport = useSelector(selectViewPort);
  const [iconActive, setIconActive] = useState({
    home: false,
    statistics: false,
    currency: false,
  });

  const handleActiveHome = () => {
    setIconActive({
      home: true,
      statistics: false,
      currency: false,
    });
  };
  const handleActiveStatistics = () => {
    setIconActive({
      home: false,
      statistics: true,
      currency: false,
    });
  };
  const handleActiveCurrency = () => {
    setIconActive({
      home: false,
      statistics: false,
      currency: true,
    });
  };
  // console.log(
  //   'viewport.mobile ',
  //   viewport.mobile,
  //   ' iconActive.currency:',
  //   iconActive.currency
  // );

  return (
    <>
      <div className={css.navigation}>
        <div className={css.navigation_block}>
          <NavLinkNavigate title="Home" directedTo="home">
            <AiFillHome
              className="icon_class"
              sx={viewport.mobile ? { fontSize: 24 } : { fontSize: 18 }}
            />
          </NavLinkNavigate>
          {/* <NavLink
            to="home"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : `${css.link}`
            }
            onClick={handleActiveHome}
          >
            <div className={css.navigationBtn}>
              <AiFillHome className={css.home} />
            </div>
          </NavLink>
          {!viewport.mobile && (
            <span
              className={
                iconActive.home
                  ? `${css.navigationBtnText} ${css.navigationBtnTextActive}`
                  : `${css.navigationBtnText}`
              }
            >
              Home
            </span>
          )} */}
        </div>
        <div className={css.navigation_block}>
          <NavLinkNavigate title="Statistics" directedTo="statistic">
            <TimelineIcon
              className="icon_class"
              sx={viewport.mobile ? { fontSize: 24 } : { fontSize: 18 }}
            />
          </NavLinkNavigate>
          {/* <NavLink
            to="statistic"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : `${css.link}`
            }
            onClick={handleActiveStatistics}
          >
            <div className={css.navigationBtn}>
              <TimelineIcon
                sx={viewport.mobile ? { fontSize: 24 } : { fontSize: 18 }}
              />
            </div>
          </NavLink>
          {!viewport.mobile && (
            <span
              className={
                iconActive.statistics
                  ? `${css.navigationBtnText} ${css.navigationBtnTextActive}`
                  : `${css.navigationBtnText}`
              }
            >
              Statistics
            </span>
          )} */}
        </div>
        {viewport.mobile && (
          <NavLinkNavigate title="Currency" directedTo="currency">
            <AttachMoneyIcon
              className="icon_class"
              sx={viewport.mobile ? { fontSize: 24 } : { fontSize: 18 }}
            />
          </NavLinkNavigate>
          // <NavLink
          //   to="currency"
          //   className={({ isActive }) =>
          //     isActive ? `${css.link} ${css.active}` : `${css.link}`
          //   }
          //   onClick={handleActiveCurrency}
          // >
          //   <div className={css.navigationBtn}>
          //     <AttachMoneyIcon sx={{ fontSize: 24 }} />
          //   </div>
          // </NavLink>
        )}
      </div>

      {!viewport.mobile ? <Balance /> : !iconActive.currency && <Balance />}
    </>
  );
};

export default Navigation;
