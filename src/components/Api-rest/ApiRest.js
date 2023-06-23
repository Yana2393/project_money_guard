import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  loginUser,
  registrationUser,
  userLogOut,
} from 'redux/Auth/authOperations';
import {
  addTransaction,
  deleteTransaction,
  getTransaction,
  updateTransaction,
} from 'redux/Transaction/transactionOperation';
import { getCategories } from 'redux/TransactionCategories/TransactionCategorOperations';
import { getSummary } from 'redux/TransactionSummaryController/TransactionSummaryControllerOperations';

const ApiRest = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  //registration{
  //   "username": "string",
  //   "email": "string",
  //   "password": "string"
  //}
  //OТВЕТ
  //   {
  //   "user": {
  //     "id": "string",
  //     "username": "string",
  //     "email": "string",
  //     "balance": 0
  //   },
  //   "token": "string"
  // }
  //   const user1 = {
  //     username: 'Pavel',
  //     email: 'pavel111@ukr.net',
  //     password: '11111111',
  //   };
  //   const currentUser = {
  //     username: 'Pavel',
  //     email: 'pavel111@ukr.net',
  //     password: '11111111',
  //   };
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIyZWY1M2RmZi03ZWE0LTQzYTItOTM4ZS1kMjIzMmMxNzI3ZGEiLCJpYXQiOjE2ODc0MzI2MTAsImV4cCI6MTAwMDAwMDE2ODc0MzI2MTB9.S2EmP6qPyyMRFm-ZABhCRXhPUUcPdn-yivcBAbmNfn8

  const Registration = user => {
    console.log('user', user);
    if (user.username !== '' && user.email !== '' && user.password !== '') {
      dispatch(registrationUser(user));
    }
  };
  const LoginUser = () => {
    if (user.email !== '' && user.password !== '') {
      const user1 = {
        email: user.email,
        password: user.password,
      };
      dispatch(loginUser(user1));
    }
  };
  const handleChange = e => {
    // setUser((user[e.target.name] = e.target.value));
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    console.log('user', user);
  };
  const userLog_Out = () => {
    console.log('user logged out');
    dispatch(userLogOut());
  };
  const transactionUser = () => {
    dispatch(getTransaction());
  };

  const getCategori = () => {
    dispatch(getCategories());
  };

  const addTransact = () => {
    const transaction = {
      transactionDate: new Date(),
      type: 'EXPENSE',
      categoryId: 'c9d9e447-1b83-4238-8712-edc77b18b739',
      comment: 'gggggg  jjj   yyyyyy',
      amount: -450,
    };
    dispatch(addTransaction(transaction));
  };
  const update_transaction = () => {
    const update_tr = {
      transactionId: '9afb7f49-3a30-4664-a364-d8a08d9e9c35',
      body: {
        transactionDate: new Date(),
        type: 'INCOME',
        categoryId: '063f1132-ba5d-42b4-951d-44011ca46262',
        comment: 'Змінюємо оплату бо очень дрого але є гроші',
        amount: 8800,
      },
    };
    dispatch(updateTransaction(update_tr));
  };

  const delete_transaction = () => {
    dispatch(deleteTransaction('10f4cd35-c583-429f-9645-c8cd47de4121'));
  };

  const get_summary = () => {
    dispatch(getSummary({ month: 6, year: 2023 }));
  };

  return (
    <>
      <input
        type="text"
        name="username"
        placeholder="name"
        onChange={handleChange}
        // value={user.username}
      />

      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={handleChange}
        //  value={user.email}
      />
      <input
        type="text"
        name="password"
        placeholder="password"
        onChange={handleChange}
        //value={user.password}
      />
      <div>
        Registration
        <button type="submit" onClick={() => Registration(user)}>
          Registration
        </button>
      </div>
      <div>
        LOGIN
        <button onClick={LoginUser}>LOGIN</button>
      </div>
      <div>
        LOG_OUT
        <button onClick={userLog_Out}>LOG_OUT</button>
      </div>
      <div>
        transactionUser
        <button onClick={transactionUser}>get_Transactions</button>
      </div>

      <div>
        add transaction
        <button onClick={addTransact}>add transaction</button>
      </div>
      <div>
        update transaction
        <button onClick={update_transaction}> update transaction</button>
      </div>
      <div>
        delete transaction
        <button onClick={delete_transaction}> delete transaction</button>
      </div>

      <div>
        get Categories
        <button onClick={getCategori}>get_Categories</button>
      </div>
      <div>
        get SUMMARY
        <button onClick={get_summary}>get SUMMARY</button>
      </div>
    </>
  );
};

export default ApiRest;
