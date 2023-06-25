import { useEffect, useRef } from 'react';
import css from './Statistic.module.css';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { summaryController } from 'redux/TransactionSummaryController/TransactionSummaryControllerSelectors';

import Select from 'react-select';

const Statistic = () => {
  const chartRef = useRef(null);
  // const balans = useSelector(selectBalanse);

  const result = useSelector(summaryController);
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', result);

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const colors = [
    'rgb(0, 173, 132)',
    // 'rgb(227, 38, 54)',
    'rgb(36, 204, 167)',
    // 'rgb(159, 43, 104)',
    'rgb(110, 120, 232)',
    // 'rgb(74, 86, 226)',
    'rgb(129, 225, 255)',
    // 'rgb(68,	148,	74)',
    'rgb(197, 186, 255)',
    // 'rgb(106,	90,	205)',
    'rgb(253, 148, 152)',
    // 'rgb(0,	49,	83)',
    'rgb(254, 208, 87)',
    // 'rgb(167,	252,	0)',
    'rgb(255, 216, 208)',
    // 'rgb(245,	255,	250)',
    'rgb(0,	191,	255)',
    'rgb(243,	71,	35)',
    'rgb(183,	132,	167)',
  ];

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
  }, []);

  const optionsMonth = [
    { value: 'December', label: 'December' },
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
  ];
  const optionsYear = [
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
  ];

  const customStyles = {
    control: provided => ({
      ...provided,
      backgroundColor: 'trasparent', // Стилизация фона окна
      height: '50px',
      appearance: 'none', // Removing default appearance
      WebkitAppearance: 'none',
      MozAppearance: 'none',
    }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,

      backgroundColor: isSelected
        ? 'rgba(255, 255, 255, 0.10)'
        : isFocused
        ? 'rgba(255, 255, 255, 0.10)'
        : 'traspatent', // Стилизация фона активной опции и ховера
      color: isSelected ? '#FF868D' : '#FBFBFB', // Стилизация цвета текста активной опции в списке
      padding: '5px 20px',
    }),
    menu: provided => ({
      ...provided,
      background:
        'linear-gradient(360deg, rgba(83, 61, 186, 0.90) 0%, rgba(80, 48, 154, 0.90) 35.94%, rgba(106, 70, 165, 0.72) 61.04%, rgba(133, 93, 175, 0.33) 100%)', // Градиентный фон для списка опций
    }),
    singleValue: provided => ({
      ...provided,
      color: '#FBFBFB', // Цвет текста активного селектора в окне
    }),
    indicatorSeparator: provided => ({
      ...provided,
      backgroundColor: 'transparent', // Цвет разделителя
    }),
    dropdownIndicator: provided => ({
      ...provided,
      color: 'rgba(251, 251, 251, 1)',
    }),
    container: provided => ({
      ...provided,
      border: '1px solid rgba(255, 255, 255, 0.60)',
      borderRadius: '8px',
      outline: 'none',
    }),
    menuList: base => ({
      ...base,
      height: '120px',

      '::-webkit-scrollbar': {
        display: 'none',
      },
      // '::-webkit-scrollbar-track': {
      //   background: 'red',
      // },
      // '::-webkit-scrollbar-thumb': {
      //   background: '#888',
      // },
      // '::-webkit-scrollbar-thumb:hover': {
      //   background: '#555',
      // },
      overflowY: 'scroll',
    }),
  };
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

  return (
    <>
      <h2 className={css.Statistic}>Statistic</h2>
      <div className={css.cont_stats}>
        <div className={css.donut}>
          <canvas className={css.dotut_donut} id="acquisitions"></canvas>
          <p className={css.statistic_balans}>₴balans</p>
        </div>
        <div className={css.cont_select_and_list}>
          <ul style={{ display: 'flex' }}>
            <li style={{ width: '182px', marginRight: '32px' }}>
              <Select
                classNames={css.container}
                styles={customStyles}
                options={optionsMonth}
                theme={theme => ({
                  ...theme,

                  colors: {
                    ...theme.colors,
                    primary50: 'rgba(255, 255, 255, 0.10)',
                    primary: 'transparent',
                    neutral40: 'rgba(255, 255, 255, 0.60)', // ховер на птичку
                    neutral20: 'transparent', // бордер
                    neutral30: 'transparent', // ховер бордер
                    neutral50: 'rgba(255, 255, 255, 0.6)', // цвет плейсхолдера
                    neutral80: 'rgba(255, 255, 255, 0.6)',
                  },
                })}
              />
            </li>
            <li style={{ width: '182px' }}>
              <Select
                classNames={css.container}
                styles={customStyles}
                options={optionsYear}
                theme={theme => ({
                  ...theme,

                  colors: {
                    ...theme.colors,
                    primary50: 'rgba(255, 255, 255, 0.10)',
                    primary: 'transparent',
                    neutral40: 'rgba(255, 255, 255, 0.60)', // ховер на птичку
                    neutral20: 'transparent', // бордер
                    neutral30: 'transparent', // ховер бордер
                    neutral50: 'rgba(255, 255, 255, 0.6)', // цвет плейсхолдера
                    neutral80: 'rgba(255, 255, 255, 0.6)',
                  },
                })}
              />
            </li>
          </ul>

          <ul className={css.transactions}>
            {newResult?.map((el, index) => (
              <li className={css.transactions_item}>
                <span
                  className={css.transactions_item_color}
                  style={{
                    backgroundColor: colors[index % colors.length],
                  }}
                ></span>
                <p className={css.transactions_item_name}>{el.name}</p>
                <p className={css.transactions_item_price}>{el.total}</p>
              </li>
            ))}
          </ul>
          <ul className={css.transactions_sum_list}>
            <li className={css.transactions_sum_item}>
              <p className={css.transactions_expenses}>Expenses:</p>
              <p className={css.transactions_expenses_sum}>{expenses}</p>
            </li>
            <li className={css.transactions_sum_item}>
              <p className={css.transactions_income}>Income:</p>
              <p className={css.transactions_income_sum}>{income}</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Statistic;
