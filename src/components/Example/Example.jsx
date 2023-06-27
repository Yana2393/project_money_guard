import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { writeDownViewport } from 'redux/Viewport/viewportSlice';
import css from '../Layout/Layout.module.css'

let viewport = {
  mobile: false,
  tablet: false,
  desktop: false,
};

const Desktop = ({ children }) => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  //console.log('isDesktop', isDesktop);
  viewport.desktop = isDesktop;

  dispatch(writeDownViewport(viewport));
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  viewport.tablet = isTablet;
  // console.log('isTablet', isTablet);

  dispatch(writeDownViewport(viewport));

  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767.9 });
  //console.log('isMobile', isMobile);
  viewport.mobile = isMobile;

  dispatch(writeDownViewport(viewport));
  return isMobile ? children : null;
};

const Example = ({ children }) => (
  <div className={css.wrap}>
    <Desktop>{children}</Desktop>
    <Tablet> {children}</Tablet>
    <Mobile>{children}</Mobile>
    {/* <Default>Not mobile (desktop or laptop or tablet)</Default> */}
  </div>
);

export default Example;
