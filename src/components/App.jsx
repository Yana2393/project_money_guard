import React from 'react';
import Layout from './Layout/Layout';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import DashboardPage from 'page/DashboardPage/DashboardPage';
import LoginPage from 'page/LoginPage/LoginPage';
import RegistrationPage from 'page/RegistrationPage/RegistrationPage';
import SummaryPage from 'page/SummaryPage/SummaryPage';
import CurrencyPage from 'page/CurrencyPage/CurrencyPage';

import '../index.css';
import Example from './Example/Example';

const App = () => {
 

  return (
  
    <Example>
      <div className="container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<DashboardPage />}></Route>
            <Route path="/statistic" element={<SummaryPage />}></Route>
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
