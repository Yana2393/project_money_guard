import { userLogOut } from 'redux/Auth/authOperations';
import css from './Header.module.css';

import { IoMdExit } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/Auth/authSelector';
import { selectViewPort } from 'redux/Viewport/viewportSelectors';
import logo from '../../images/logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const viewport = useSelector(selectViewPort);
  const handleLogOut = () => {
    dispatch(userLogOut());
  };

  return (
    <div className={css.header}>
      <div className="container">
        <div className={css.headerInfo}>
          <img
            className={css.logo}
            src={logo}
            alt="logo"
            width="86px"
            height="36px"
          />
          <div className={css.headerRigth}>
            <span className={css.userText}>
              {currentUser?.username && currentUser.username}
            </span>
            <button className={css.headerBtn} onClick={handleLogOut}>
              <IoMdExit className={css.iconBtn} />
              {!viewport.mobile && <span className={css.userText}>Exit</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
