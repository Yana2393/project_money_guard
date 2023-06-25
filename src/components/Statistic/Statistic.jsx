import { useEffect } from 'react';
import css from './Statistic.module.css';
import { getSummary } from 'redux/TransactionSummaryController/TransactionSummaryControllerOperations';
import { useDispatch } from 'react-redux';

const Statistic = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const date = new Date();
    dispatch(getSummary({ month: date.getMonth(), year: date.getFullYear() }));
  }, [dispatch]);
  return <div className={css.Statistic}>Statistic</div>;
};

export default Statistic;
