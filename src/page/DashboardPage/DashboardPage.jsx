import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';
import HomeTab from 'components/HomeTab/HomeTab';
import css from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div className={css.position}>
      <HomeTab />
      <ButtonAddTransactions />
    </div>
  );
};

export default DashboardPage;
