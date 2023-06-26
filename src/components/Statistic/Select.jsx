import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { getSummary } from 'redux/TransactionSummaryController/TransactionSummaryControllerOperations';

export const SelectComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const date = new Date();
    dispatch(getSummary({ month: date.getMonth(), year: date.getFullYear() }));
  }, [dispatch]);

  const optionsMonth = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
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
        : 'transparent', // Стилизация фона активной опции и ховера
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
      overflowY: 'scroll',
    }),
  };

  const handleChangeSelect = () => {
    console.log(new Date().getMonth());
  };
  return (
    <ul style={{ display: 'flex' }}>
      <li key={122} style={{ width: '182px', marginRight: '32px' }}>
        <Select
          onChange={handleChangeSelect}
          // classNames={css.container}
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
      <li key={222} style={{ width: '182px' }}>
        <Select
          onChange={handleChangeSelect}
          // classNames={css.container}
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
  );
};
