import { createAsyncThunk } from '@reduxjs/toolkit';

import { Api } from 'redux/api/Api';

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

      return data;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);
export const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransaction',
  async (transaction, thunk_Api) => {
    try {
      await Api.delete(`transactions/${transaction.id}`);

      return transaction;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);
