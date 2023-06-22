import { createSlice } from '@reduxjs/toolkit';
import { getSummary } from './TransactionSummaryControllerOperations';

const initialState = {
  categoriesSummary: [
    {
      name: '',
      type: '',
      total: 0,
    },
  ],
  incomeSummary: 0,
  expenseSummary: 0,
  periodTotal: 0,
  year: 0,
  month: 0,
  isLoading: false,
  isError: '',
};

export const TransactionSummaryControllerSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getSummary.pending, state => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(getSummary.fulfilled, (state, { payload }) => {
        console.log('getSummary ', payload);
        state.isLoading = false;
        state.categoriesSummary = payload.categoriesSummary;
        state.incomeSummary = payload.incomeSummary;
        state.expenseSummary = payload.expenseSummary;
        state.periodTotal = payload.periodTotal;
        state.year = payload.year;
        state.month = payload.month;
      })
      .addCase(getSummary.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      });
  },
});

export const TransactionSummaryControllerReduser =
  TransactionSummaryControllerSlice.reducer;
