import React from 'react';

const ModalAddTransaction = () => {
  const status = {
    Income: 'income',
    Expence: 'expence',
  };

  const handleChange = () => {};

  return (
    <div>
      <section>
        <h2>Add transaction</h2>
        <label>
          Income
          <input
            type="radio"
            checked={status === status.Income}
            name="income"
            value={status.Income}
            onChange={handleChange}
          />
        </label>
        <label>
          Expence
          <input
            type="radio"
            checked={status === status.Expence}
            name="expence"
            value={status.Expence}
            onChange={handleChange}
          />
        </label>
      </section>
    </div>
  );
};

export default ModalAddTransaction;
