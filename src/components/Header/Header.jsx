import Api_rest from 'components/Api-rest/Api_rest';
import css from './Header.module.css';

const Header = () => {
  return (
    <div className={css.header}>
      Header
      <Api_rest />
    </div>
  );
};

export default Header;
