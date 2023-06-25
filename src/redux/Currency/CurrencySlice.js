import { createSlice } from '@reduxjs/toolkit';
import { getCurrency } from './CurrencyOperations';

const initialState = {
  currency: [],
  isLoading: false,
  isError: '',
  dataCurrency: '',
};

export const CurrencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateDataCurrency(state, { payload }) {
      state.dataCurrency = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrency.pending, state => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(getCurrency.fulfilled, (state, { payload }) => {
        state.currency = payload.filter(
          el =>
            (el.currencyCodeA === 840 || el.currencyCodeA === 978) &&
            el.currencyCodeB === 980
        );
        // state.dataCurrency = new Date();
        state.isLoading = false;
      })
      .addCase(getCurrency.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      });
  },
});

export const CurrencyReducer = CurrencySlice.reducer;
export const { updateDataCurrency } = CurrencySlice.actions;
