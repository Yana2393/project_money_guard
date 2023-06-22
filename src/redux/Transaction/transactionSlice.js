import { createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  deleteTransaction,
  getTransaction,
  updateTransaction,
} from './transactionOperation';

const initialState = {
  transactions: [],
  isLoading: false,
  isError: '',
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getTransaction.pending, state => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(getTransaction.fulfilled, (state, { payload }) => {
        state.transactions = payload;
        state.isLoading = false;
      })
      .addCase(getTransaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(addTransaction.pending, state => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.transactions = [payload, ...state.transactions];
        state.isLoading = false;
      })
      .addCase(addTransaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(updateTransaction.pending, state => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(updateTransaction.fulfilled, (state, { payload }) => {
        state.transactions = state.transactions.map(transaction => {
          if (transaction.id === payload.id) {
            return payload;
          }
          return transaction;
        });
        state.isLoading = false;
      })
      .addCase(updateTransaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(deleteTransaction.pending, state => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        state.transactions = state.transactions.filter(
          transaction => transaction.id !== payload
        );
        state.isLoading = false;
      })
      .addCase(deleteTransaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
