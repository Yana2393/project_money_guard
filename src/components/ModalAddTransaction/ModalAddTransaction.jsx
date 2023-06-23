import React from 'react';
import { useParams } from 'react-router';

const ModalAddTransaction = ({ children }) => {
  const trasactionId = useParams();
  console.log('trasactionId: ', trasactionId);
  return <div>ModalForm trasactionId: {children}</div>;
};
export default ModalAddTransaction;
