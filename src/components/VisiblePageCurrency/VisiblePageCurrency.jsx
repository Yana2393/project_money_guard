import { useMediaQuery } from 'react-responsive';

const NoMobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return !isMobile ? children : null;
};

const VisiblePageCurrency = ({ children }) => {
  return <NoMobile>{children}</NoMobile>;
};

export default VisiblePageCurrency;
