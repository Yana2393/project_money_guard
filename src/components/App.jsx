import React, { useEffect } from 'react';
import Layout from './Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from 'page/DashboardPage/DashboardPage';
import LoginPage from 'page/LoginPage/LoginPage';
// import RegistrationPage from 'page/RegistrationPage/RegistrationPage';
import CurrencyPage from 'page/CurrencyPage/CurrencyPage';

import '../index.css';
import Example from './Example/Example';
import StatisticPage from 'page/StatisticPage/StatisticPage';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from 'redux/Auth/authOperations';
import {
  selectIsError,
  selectIsRefresher,
  selectToken,
} from 'redux/Auth/authSelector';
import { Loader } from './Loader/Loader';
import { getTransaction } from 'redux/Transaction/transactionOperation';
import { getCategories } from 'redux/TransactionCategories/TransactionCategorOperations';

import ModalAddTransaction from './ModalAddTransaction/ModalAddTransaction';
import { modalAddOpen } from 'redux/ModalAddOpen/ModalAddOpenSelector';

import PublicRoute from './PublicRoute/PublicRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalBackground from './ModalBackground/ModalBackground';
import RegistrationPage from 'page/RegistrationPage/RegistrationPage';
// import { modalEditOpen } from 'redux/ModalEditTransaction/ModalEditTransactionSelector';
// import ModalEditTransaction from './ModalEditTransaction/ModalEditTransaction';

const App = () => {
  const dispatch = useDispatch();
  const isRefresher = useSelector(selectIsRefresher);
  const token = useSelector(selectToken);
  const openModal = useSelector(modalAddOpen);
  // const ModalEditOpen = useSelector(modalEditOpen);
  const isErrorLoginRegistration = useSelector(selectIsError);

  useEffect(() => {
    dispatch(refreshUser());
    if (token) {
      dispatch(getTransaction());
      dispatch(getCategories());
    }
  }, [dispatch, token]);

  // if (isErrorLogin) {
  //   console.log('error');
  // }

  const handleToach = () => {
    toast.error(isErrorLoginRegistration, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return isRefresher ? (
    <Loader />
  ) : (
    <>
      {openModal && (
        <ModalBackground title="add">
          <ModalAddTransaction />
        </ModalBackground>
      )}
      {/* {ModalEditOpen && (
        <ModalBackground title="edit">
          <ModalEditTransaction />
        </ModalBackground>
      )} */}
      {isErrorLoginRegistration && handleToach()}
      <ToastContainer />
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
              <PublicRoute redirectTo="/home" component={<LoginPage />} />
            }
          ></Route>
          <Route
            path="/registration"
            element={
              <PublicRoute
                redirectTo="/home"
                component={<RegistrationPage />}
              />
            }
          ></Route>
          {/* <Route
            path="/transaction/:transactionId"
            element={<ModalAddTransaction />}
          ></Route> */}

          <Route path="*" element={<Navigate to="/home" />}></Route>
        </Routes>
      </Example>
    </>
  );
};

export default App;
