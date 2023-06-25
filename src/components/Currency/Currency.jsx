import { useDispatch, useSelector } from 'react-redux';
import css from './Currency.module.css';
import { selectViewPort } from 'redux/Viewport/viewportSelectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCurrency } from 'redux/Currency/CurrencyOperations';
import { updateDataCurrency } from 'redux/Currency/CurrencySlice';
import { selectDataCurrency } from 'redux/Currency/CurrencySelectors';

const Currency = () => {
  const viewport = useSelector(selectViewPort);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataCurrency = useSelector(selectDataCurrency);

  useEffect(() => {
    const getTime = new Date() - new Date(dataCurrency);

    if (getTime < 3600000) {
      return;
    }

    dispatch(getCurrency());
    dispatch(updateDataCurrency(new Date()));
  }, [dispatch, dataCurrency]);

  if (!viewport.mobile && location.pathname === '/currency') {
    navigate('/home');
  }
  return (
    <div className={css.CurrencyPage}>
      <table className={css.Currency}>
        <tr>
          <th>Curency</th>
          <th>Purchase</th>
          <th>Sale</th>
        </tr>
        <tr className={css.margin}>
          <td>USD</td>
          <td>usdPurch</td>
          <td>usdSale</td>
        </tr>
        <tr className={css.margin}>
          <td>EUR</td>
          <td>eurPurch</td>
          <td>eurSale</td>
        </tr>
      </table>
    </div>
  );
};

export default Currency;
