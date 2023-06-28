import { AiFillHome } from 'react-icons/ai';
import TimelineIcon from '@mui/icons-material/Timeline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import css from './Navigation.module.css';

import { useSelector } from 'react-redux';
import { selectViewPort } from 'redux/Viewport/viewportSelectors';
import { useState } from 'react';
import Balance from 'components/Balance/Balance';
import NavLinkNavigate from 'components/NavLinkNavigate/NavLinkNavigate';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const viewport = useSelector(selectViewPort);
  const [iconActive, setIconActive] = useState({
    home: location.pathname === '/home' ? true : false,

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

  return (
    <>
      <div className={css.navigation}>
        <div className={css.navigation_block} onClick={handleActiveHome}>
          <NavLinkNavigate directedTo="home" title="Home">
            <AiFillHome className="icon_class" />
          </NavLinkNavigate>
        </div>
        <div className={css.navigation_block} onClick={handleActiveStatistics}>
          <NavLinkNavigate directedTo="statistic" title="Statistic">
            {
              <TimelineIcon
                sx={viewport.mobile ? { fontSize: 24 } : { fontSize: 18 }}
              />
            }
          </NavLinkNavigate>
        </div>
        {viewport.mobile && (
          <div className={css.navigation_block} onClick={handleActiveCurrency}>
            <NavLinkNavigate directedTo="currency" title="Currency">
              {<AttachMoneyIcon sx={{ fontSize: 24 }} />}
            </NavLinkNavigate>
          </div>
        )}
      </div>

      {(!viewport.mobile || (iconActive.home && viewport.mobile)) && (
        <Balance />
      )}
    </>
  );
};

export default Navigation;
