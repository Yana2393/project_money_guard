import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './TransactionCategorOperations';

const initialState = {
  categories: [
    {
      id: '2',
      name: 'Gift',
      type: 'INCOME',
    },
  ],
  isLoading: false,
  isError: '',
};

export const TransactionCategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, state => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;

        state.isLoading = false;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      });
  },
});

export const TransactionCategoriesReducer = TransactionCategoriesSlice.reducer;
