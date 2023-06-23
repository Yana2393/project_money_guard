import css from './Balance.module.css';

const Balance = () => {
  return (
    <div className={css.Balance}>
      Your balance
      <div className={css.Money}>$ 24 000.00</div>
    </div>
  );
};

export default Balance;
