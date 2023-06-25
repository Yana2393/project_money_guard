import React, { useEffect } from 'react';
import Layout from './Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from 'page/DashboardPage/DashboardPage';
import LoginPage from 'page/LoginPage/LoginPage';
import RegistrationPage from 'page/RegistrationPage/RegistrationPage';
import CurrencyPage from 'page/CurrencyPage/CurrencyPage';

import '../index.css';
import Example from './Example/Example';
import StatisticPage from 'page/StatisticPage/StatisticPage';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from 'redux/Auth/authOperations';
import { selectIsRefresher, selectToken } from 'redux/Auth/authSelector';
import { Loader } from './Loader/Loader';
import { getTransaction } from 'redux/Transaction/transactionOperation';
import { getCategories } from 'redux/TransactionCategories/TransactionCategorOperations';
import { getSummary } from 'redux/TransactionSummaryController/TransactionSummaryControllerOperations';

import ModalAddTransaction from './ModalAddTransaction/ModalAddTransaction';
import { modalAddOpen } from 'redux/ModalAddOpen/ModalAddOpenSelector';
import ModalBackground from './ModalBackground/ModalBackground';
import { getCurrency } from 'redux/Currency/CurrencyOperations';

// import ModalEditTransaction from './ModalEditTransaction/ModalEditTransaction';

const App = () => {
  const dispatch = useDispatch();
  const isRefresher = useSelector(selectIsRefresher);
  const token = useSelector(selectToken);
  const openModal = useSelector(modalAddOpen);

  useEffect(() => {
    dispatch(refreshUser());
    if (token) {
      dispatch(getTransaction());
      dispatch(getCategories());
      dispatch(getSummary({ month: 6, year: 2023 }));
      dispatch(getCurrency());
    }
    // dispatch(fetchContacts());
  }, [dispatch, token]);

  return isRefresher ? (
    <Loader />
  ) : (
    <>
      {openModal && (
        <ModalBackground>
          <ModalAddTransaction />
        </ModalBackground>
      )}
      <Example>
        {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<DashboardPage />}></Route>
            <Route path="/statistic" element={<StatisticPage />}></Route>
            <Route path="/currency" element={<CurrencyPage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/registration" element={<RegistrationPage />}></Route>
          <Route
            path="/transaction/:transactionId"
            element={<ModalAddTransaction />}
          ></Route>
          {/* <Route
              path="/transaction/add_transaction"
              element={<ModalAddTransaction />}
            ></Route> */}
          <Route path="*" element={<Navigate to="/home" />}></Route>
        </Routes>
        {/* </div> */}
      </Example>
    </>
  );
};

export default App;
