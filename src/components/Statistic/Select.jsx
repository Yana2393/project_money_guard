import Select from 'react-select';

export const SelectComponent = () => {
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
  return (
    <ul style={{ display: 'flex' }}>
      <li key={122} style={{ width: '182px', marginRight: '32px' }}>
        <Select
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
