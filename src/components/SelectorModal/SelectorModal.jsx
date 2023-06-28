import { useSelector } from 'react-redux';
import Select from 'react-select';
import { selectTransactionCategories } from 'redux/TransactionCategories/TransactionCategoriesSelectors';

export const SelectCategory = ({ getCategoryId, currentCategoryId }) => {
  const transCategory = useSelector(selectTransactionCategories);

  const nameCurrentCategory = id => {
    const selectedCategory = transCategory.filter(
      category => category.id === id
    );

    return selectedCategory[0]?.name;
  };
  const currentNameCategory = nameCurrentCategory(currentCategoryId);
  const customStyles = {
    control: provided => ({
      ...provided,
      backgroundColor: 'trasparent', // Стилизация фона окна
      height: '44px',
      appearance: 'none', // Removing default appearance
      WebkitAppearance: 'none',
      MozAppearance: 'none',
    }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,

      backgroundColor: isSelected
        ? 'rgba(255, 255, 255, 0.1)'
        : isFocused
        ? 'rgba(255, 255, 255, 0.1)'
        : 'transparent', // Стилизация фона активной опции и ховера
      color: isSelected ? '#FF868D' : '#FBFBFB', // Стилизация цвета текста активной опции в списке
      padding: '5px 20px',
    }),
    menu: provided => ({
      ...provided,
      background:
        'linear-gradient(360deg, rgba(83, 61, 186, 1) 0%, rgba(80, 48, 154, 1) 35.94%, rgba(106, 70, 165, 1) 61.04%, rgba(133, 93, 175, 1) 100%)', // Градиентный фон для списка опций
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
      height: '320px',

      '::-webkit-scrollbar': {
        display: 'none',
      },
      overflowY: 'scroll',
    }),
  };

  const optionCategory = transCategory.map(e => ({
    value: e.id,
    label: e.name,
  }));

  const handleOnChange = e => {
    const categoryId = e.value;
    getCategoryId(categoryId);
  };

  return (
    <Select
      placeholder={
        currentNameCategory ? currentNameCategory : 'Select a category'
      }
      options={optionCategory}
      onChange={handleOnChange}
      styles={customStyles}
    />
  );
};
