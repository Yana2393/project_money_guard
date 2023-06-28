import { createAsyncThunk } from '@reduxjs/toolkit';

import { Api } from 'redux/api/Api';
//import { token } from 'redux/api/Api';

export const getSummary = createAsyncThunk(
  'transactions/getSummary',
  async (period, thunk_Api) => {
    try {
      const { data } = await Api.get('transactions-summary', {
        params: period,
      });

      return data;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);
