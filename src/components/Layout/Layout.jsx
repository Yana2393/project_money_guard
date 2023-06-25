import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import css from './Layout.module.css';
import CurrencyPage from 'page/CurrencyPage/CurrencyPage';

import { useSelector } from 'react-redux';
import { selectViewPort } from 'redux/Viewport/viewportSelectors';

const Layout = () => {
  const viewport = useSelector(selectViewPort);

  return (
    <>
      <Header />

      <div className={css.layOut}>
        <div className={css.position}>
          <div className={css.navigate_balance}>
            <Navigation />
          </div>
          <div className={css.VisiblePageCurrency}>
            {!viewport.mobile && <CurrencyPage />}
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
