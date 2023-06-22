import { createAsyncThunk } from '@reduxjs/toolkit';

import { Api } from 'redux/api/Api';
//import { token } from 'redux/api/Api';

export const getTransaction = createAsyncThunk(
  'transaction/getTransaction',
  async (_, thunk_Api) => {
    try {
      const { data } = await Api.get('transactions');

      return data;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transaction/addTransaction',
  async (transaction, thunk_Api) => {
    try {
      const { data } = await Api.post('transactions', transaction);
      console.log('ADD Transaction', data);
      return data;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);
export const updateTransaction = createAsyncThunk(
  'transaction/updateTransaction',
  async (transaction, thunk_Api) => {
    try {
      const { data } = await Api.patch(
        `transactions/${transaction.transactionId}`,
        transaction.body
      );
      console.log('update Transaction', data);
      return data;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);
export const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransaction',
  async (transactionId, thunk_Api) => {
    try {
      const { data } = await Api.delete(`transactions/${transactionId}`);
      console.log('deleteTransaction', data);
      return transactionId;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);
