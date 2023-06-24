import { useSelector } from 'react-redux';
import css from './Balance.module.css';
import { selectBalanse } from 'redux/Auth/authSelector';

const Balance = () => {
  const balanse = useSelector(selectBalanse);
  return (
    <div className={css.Balance}>
      Your balance
      <div className={css.Money}>
        <span className={css.total}>{`$ ${balanse}`}</span>{' '}
      </div>
    </div>
  );
};

export default Balance;
