import { userLogOut } from 'redux/Auth/authOperations';
import css from './Header.module.css';

import { IoMdExit } from 'react-icons/io';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(userLogOut());
  };
  return (
    <div className={css.header}>
      <div className="container">
        <div className={css.headerInfo}>
          <img src="" alt="logo" />
          <button onClick={handleLogOut}>
            <IoMdExit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
