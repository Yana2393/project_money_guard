import css from './Header.module.css';
import { FaBeer } from 'react-icons/fa';

import { IoMdExit } from 'react-icons/io';

const Header = () => {
  return (
    <div className={css.header}>
      <div className="container">
        <div className={css.headerInfo}>
          <img src="" alt="logo" />
          <button>
            <IoMdExit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
