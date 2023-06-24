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
import { getCurrency } from 'redux/Currency/CurrencyOperations';
import PublicRoute from './PublicRoute/PublicRoute';
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import PrivateRoute from './PrivateRoute/PrivateRoute';

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
      {openModal && <ModalAddTransaction />}
      <Example>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />}></Route>

            <Route
              path="/home"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<DashboardPage />}
                />
              }
            ></Route>
            <Route
              path="/statistic"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<StatisticPage />}
                />
              }
            ></Route>
            <Route
              path="/currency"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<CurrencyPage />}
                />
              }
            ></Route>
          </Route>
          <Route
            path="/login"
            element={
              <PublicRoute redirectTo="/home" component={<LoginForm />} />
            }
          ></Route>
          <Route
            path="/registration"
            element={
              <PublicRoute
                redirectTo="/home"
                component={<RegistrationForm />}
              />
            }
          ></Route>
          <Route
            path="/transaction/:transactionId"
            element={<ModalAddTransaction />}
          ></Route>

          <Route path="*" element={<Navigate to="/home" />}></Route>
        </Routes>
      </Example>
    </>
  );
};

export default App;
