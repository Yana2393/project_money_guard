import React, { useState } from 'react';
import css from './AntiSwitch.module.css';

const AntiSwitch = ({ onTypeSelected, type }) => {
  const [selectedType, setSelectedType] = useState(type);

  const handleTypeSelection = type => {
    setSelectedType(type);
    onTypeSelected(type);
  };

  return (
    <div className={css.AntiSwitchWrap}>
      <button
        className={`${css.AntiSwitchIncome} ${
          selectedType === 'INCOME' ? css.AntiSwitchIncomeActive : ''
        }`}
        onClick={() => handleTypeSelection('INCOME')}
      >
        Income
      </button>
      <span className={css.AntiSwitchSlesh}>/</span>
      <button
        className={`${css.AntiSwitchExpense} ${
          selectedType === 'EXPENSE' ? css.AntiSwitchExpenseActive : ''
        }`}
        onClick={() => handleTypeSelection('EXPENSE')}
      >
        Expense
      </button>
    </div>
  );
};

export default AntiSwitch;
