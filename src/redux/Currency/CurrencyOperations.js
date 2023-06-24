import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiCurrency } from 'redux/api/Api';

export const getCurrency = createAsyncThunk(
  'currency/getCurrency',
  async (_, thunk_Api) => {
    // const state = thunk_Api.getState();

    // const dataCurrency = state.currency.currency;
    // const time = new Date() - dataCurrency?.dataCurrency;

    // console.log('dataCurrency-state ==  ', state);
    // console.log('time ==  ', time);
    // if (time < 3600) {
    //   console.log('КОРОТКИЙ ЧАС ДЛЯ ЗАПИТУ !!!');
    //   return;
    // }

    try {
      const { data } = await ApiCurrency.get();
      console.log('Currensy Data: ', data);
      return data;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);
