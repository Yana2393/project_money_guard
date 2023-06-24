import { useSelector } from 'react-redux';
import css from './Currency.module.css';
import { selectViewPort } from 'redux/Viewport/viewportSelectors';
import { useLocation, useNavigate } from 'react-router-dom';

const Currency = () => {
  const viewport = useSelector(selectViewPort);
  const location = useLocation();
  const navigate = useNavigate();

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
        <tr>
          <td>USD</td>
          <td>usdPurch</td>
          <td>usdSale</td>
        </tr>
        <tr>
          <td>EUR</td>
          <td>eurPurch</td>
          <td>eurSale</td>
        </tr>
      </table>
    </div>
  );
};

export default Currency;
