import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiCurrency } from 'redux/api/Api';

export const getCurrency = createAsyncThunk(
  'currency/getCurrency',
  async (_, thunk_Api) => {
    // const state = thunk_Api.getState();

    // const dataCurrency = state.currency.dataCurrency;
    // const data = new Date();
    // console.log('DATA+', data);
    // const getTime = data - new Date(dataCurrency);
    // console.log('getTime', getTime, 'dataCurrency:=', dataCurrency);
    // if (getTime < 3600000) {
    //   return;
    // }

    try {
      const { data } = await ApiCurrency.get();

      return data;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);
