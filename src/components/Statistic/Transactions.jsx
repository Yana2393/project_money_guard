import React from 'react';
import css from './Statistic.module.css';
import { useSelector } from 'react-redux';
import { summaryController } from 'redux/TransactionSummaryController/TransactionSummaryControllerSelectors';

export const colors = [
  'rgb(0, 173, 132)',
  'rgb(36, 204, 167)',
  'rgb(110, 120, 232)',
  'rgb(129, 225, 255)',
  'rgb(197, 186, 255)',
  'rgb(253, 148, 152)',
  'rgb(254, 208, 87)',
  'rgb(255, 216, 208)',
  'rgb(0, 191, 255)',
  'rgb(243, 71, 35)',
  'rgb(183, 132, 167)',
];

export const Transactions = () => {
  const result = useSelector(summaryController);
  const newResult = result.map(el => {
    if (el.type === 'EXPENSE') {
      return { ...el, total: Math.abs(el.total) };
    }
    return el;
  });

  let expenses = 0;
  let income = 0;
  for (let i = 0; i < newResult.length; i++) {
    newResult[i].type === 'EXPENSE'
      ? (expenses += newResult[i].total)
      : (income += newResult[i].total);
  }

  const formatExpenses = expenses.toLocaleString('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  const formatIncome = income.toLocaleString('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return (
    <>
      <ul className={css.transactions}>
        {newResult?.map((el, index) => (
          <li key={1 + index} className={css.transactions_item}>
            <span
              className={css.transactions_item_color}
              style={{
                backgroundColor: colors[index % colors.length],
              }}
            ></span>
            <p className={css.transactions_item_name}>{el.name}</p>
            <p className={css.transactions_item_price}>
              {el.total.toLocaleString('uk-UA', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}
            </p>
          </li>
        ))}
      </ul>

      <ul className={css.transactions_sum_list}>
        <li key={223} className={css.transactions_sum_item}>
          <p className={css.transactions_expenses}>Expenses:</p>
          <p className={css.transactions_expenses_sum}>{formatExpenses}</p>
        </li>
        <li key={224} className={css.transactions_sum_item}>
          <p className={css.transactions_income}>Income:</p>
          <p className={css.transactions_income_sum}>{formatIncome}</p>
        </li>
      </ul>
    </>
  );
};
