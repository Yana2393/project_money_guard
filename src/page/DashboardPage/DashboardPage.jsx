import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';
import css from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div className={css.DashboardPage}>
      DashboardPage
      <ButtonAddTransactions />
    </div>
  );
};

export default DashboardPage;
