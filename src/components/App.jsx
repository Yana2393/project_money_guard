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
import { selectIsRefresher } from 'redux/Auth/authSelector';
import { Loader } from './Loader/Loader';

const App = () => {
  const dispatch = useDispatch();
  const isRefresher = useSelector(selectIsRefresher);
  useEffect(() => {
    dispatch(refreshUser());
    // dispatch(fetchContacts());
  }, [dispatch]);

  return isRefresher ? (
    <Loader />
  ) : (
    <Example>
      <div className="container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<DashboardPage />}></Route>
            <Route path="/statistic" element={<StatisticPage />}></Route>
            <Route path="/currency" element={<CurrencyPage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/registration" element={<RegistrationPage />}></Route>
        </Routes>
      </div>
    </Example>
  );
};

export default App;
