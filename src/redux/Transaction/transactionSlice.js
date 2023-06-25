import { createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  deleteTransaction,
  getTransaction,
  updateTransaction,
} from './transactionOperation';

const initialState = {
  transactions: [
    {
      id: '1',
      transactionDate: '15.06.22',
      type: 'INCOME',
      categoryId: '2',
      userId: '3',
      comment: 'good morning',
      amount: 1000,
      balanceAfter: 1000,
    },
    {
      id: '2',
      transactionDate: '17.06.22',
      type: 'INCOME',
      categoryId: '2',
      userId: '3',
      comment: 'good afternoon',
      amount: 2000,
      balanceAfter: 3000,
    },
  ],
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
          transaction => transaction.id !== payload.id
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
