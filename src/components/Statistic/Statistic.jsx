import css from './Statistic.module.css';

import { useSelector } from 'react-redux';
import { summaryController } from 'redux/TransactionSummaryController/TransactionSummaryControllerSelectors';

// import { getSummary } from 'redux/TransactionSummaryController/TransactionSummaryControllerOperations';
import { selectBalanse } from 'redux/Auth/authSelector';
import { SelectComponent } from './Select';
import { Transactions } from './Transactions';

import { colors } from './Transactions';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistic = () => {
  const balans = useSelector(selectBalanse);
  // const chartRef = useRef(null);
  const result = useSelector(summaryController);

  const data = {
    labels: result.map(el => el.name),

    datasets: [
      {
        label: '# of Votes',
        data: result.map(el => el.total),
        backgroundColor: colors,
        borderColor: ['rgba(255, 255, 255, 0.6)'],
        borderWidth: 1,
        cutout: '70%',
        hoverOffset: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Установите значение false, чтобы скрыть легенду
      },
    },
  };

  const formatBalans = balans.toLocaleString('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  // useEffect(() => {
  //   if (chartRef.current) {
  //     chartRef.current.destroy();
  //   }
  //   chartRef.current = new Chart(document.getElementById('acquisitions'), {
  //     type: 'doughnut',
  //     data: {
  //       datasets: [
  //         {
  //           data: result.map(el => el.total),
  //           hoverOffset: 2,
  //           backgroundColor: colors,
  //         },
  //       ],
  //     },
  //     options: {
  //       cutout: '70%',
  //       borderWidth: 1,
  //     },
  //   });
  // }, [result]);

  return (
    <div>
      <h2 className={css.Statistic}>Statistic</h2>
      <div className={css.cont_stats}>
        <div className={css.donut}>
          <Doughnut className={css.dotut_donut} data={data} options={options} />
          {result && <p className={css.statistic_balans}>₴{formatBalans}</p>}
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
    </div>
  );
};

export default Statistic;
