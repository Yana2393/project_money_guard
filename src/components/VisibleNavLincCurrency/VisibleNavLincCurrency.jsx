import { useMediaQuery } from 'react-responsive';

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? children : null;
};

const VisibleNavLincCurrency = ({ children }) => {
  return <Mobile>{children}</Mobile>;
};

export default VisibleNavLincCurrency;
