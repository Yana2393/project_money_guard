import RegistrationForm from 'components/RegistrationForm/RegistrationForm';
import React from 'react';
import css from './RegistrationPage.module.css';
const RegistrationPage = () => {
  return (
    <div className={css.registration}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
