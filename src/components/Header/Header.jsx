import ApiRest from 'components/Api-rest/ApiRest';
import css from './Header.module.css';
import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';

const Header = () => {
  return (
    <div className={css.header}>
      Header Headre
      <ApiRest />
      <ButtonAddTransactions />
      <button> ВИЙТИ</button>
    </div>
  );
};

export default Header;
