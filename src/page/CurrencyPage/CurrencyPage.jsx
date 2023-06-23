import css from './CurrencyPage.module.css';

const CurrencyPage = () => {
  return <div className={css.CurrencyPage}>
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
</div>;
};

export default CurrencyPage;
