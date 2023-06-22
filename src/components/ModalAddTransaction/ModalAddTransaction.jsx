import React from 'react';
import ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';

const ModalAddTransaction = () => {
  const modalRoot = document.getElementById("modal-root");
  const status = {
    Income: 'income',
    Expence: 'expence',
  };

  const handleChange = () => { };
  
  const jsx = <div>
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

  return createPortal(jsx,modalRoot)
    
  );
};

export default ModalAddTransaction;
