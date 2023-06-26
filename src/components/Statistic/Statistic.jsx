import { useEffect, useRef } from 'react';
import css from './Statistic.module.css';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { summaryController } from 'redux/TransactionSummaryController/TransactionSummaryControllerSelectors';

// import { getSummary } from 'redux/TransactionSummaryController/TransactionSummaryControllerOperations';
import { selectBalanse } from 'redux/Auth/authSelector';
import { SelectComponent } from './Select';
import { Transactions } from './Transactions';

import { colors } from './Transactions';

const Statistic = () => {
  const balans = useSelector(selectBalanse);
  const chartRef = useRef(null);
  const result = useSelector(summaryController);

  const formatBalans = balans.toLocaleString('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(document.getElementById('acquisitions'), {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: result.map(el => el.total),
            hoverOffset: 2,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        cutout: '70%',
        borderWidth: 1,
      },
    });
  }, [result]);

  return (
    <>
      <h2 className={css.Statistic}>Statistic</h2>
      <div className={css.cont_stats}>
        <div className={css.donut}>
          <canvas className={css.dotut_donut} id="acquisitions"></canvas>
          <p className={css.statistic_balans}>₴{formatBalans}</p>
        </div>
        <div className={css.cont_select_and_list}>
          <SelectComponent />

          <div className={css.stats_label}>
            <p className={css.stats_label_category_sum}>Category</p>
            <p className={css.stats_label_category_sum}>Sum</p>
          </div>

          <Transactions />
        </div>
      </div>
    </>
  );
};

export default Statistic;
