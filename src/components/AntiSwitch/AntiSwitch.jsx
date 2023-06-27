import React, { useState } from 'react';
import css from './AntiSwitch.module.css';

const AntiSwitch = ({ onTypeSelected }) => {
  const [selectedType, setSelectedType] = useState('expense');

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    onTypeSelected(type);
  };

  return (
    <div className={css.AntiSwitchWrap}>
      <button
        className={`${css.AntiSwitchIncome} ${
          selectedType === 'income' ? css.AntiSwitchIncomeActive : ''
        }`}
        onClick={() => handleTypeSelection('income')}
      >
        Income
      </button>
      <span className={css.AntiSwitchSlesh}>/</span>
      <button
        className={`${css.AntiSwitchExpense} ${
          selectedType === 'expense' ? css.AntiSwitchExpenseActive : ''
        }`}
        onClick={() => handleTypeSelection('expense')}
      >
        Expense
      </button>
    </div>
  );
};

export default AntiSwitch;
