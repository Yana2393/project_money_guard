import css from './Header.module.css';
import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';

const Header = () => {
  return (
    <div className={css.header}>
      Header Headre
      <ButtonAddTransactions />
      <button> ВИЙТИ</button>
    </div>
  );
};

export default Header;
