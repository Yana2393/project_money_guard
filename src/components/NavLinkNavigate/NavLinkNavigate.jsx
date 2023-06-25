import { NavLink } from 'react-router-dom';
import css from './NavLinkNavigate.module.css';

import { useSelector } from 'react-redux';
import { selectViewPort } from 'redux/Viewport/viewportSelectors';

const NavLinkNavigate = ({ directedTo, title, children }) => {
  const viewport = useSelector(selectViewPort);

  return (
    <NavLink
      to={directedTo}
      className={({ isActive }) =>
        isActive ? `${css.link} ${css.active}` : `${css.link}`
      }
    >
      <div className={css.position_relativ}>
        <div className={css.iconBtn}>{children}</div>
        {!viewport.mobile && <span className={css.title}>{title}</span>}
      </div>
    </NavLink>
  );
};

export default NavLinkNavigate;
