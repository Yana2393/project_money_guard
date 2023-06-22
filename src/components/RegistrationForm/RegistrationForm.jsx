import React from 'react';
import { useDispatch } from 'react-redux';
import { registrationUser } from 'redux/Auth/authOperations';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleRegistration = () => {
    dispatch(registrationUser());
  };
  return (
    <div>
      RegistrationForm
      <button onClick={handleRegistration}>Registration</button>
    </div>
  );
};

export default RegistrationForm;
