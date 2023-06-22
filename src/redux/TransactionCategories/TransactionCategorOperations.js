import { createAsyncThunk } from '@reduxjs/toolkit';

import { Api } from 'redux/api/Api';
//import { token } from 'redux/api/Api';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, thunk_Api) => {
    try {
      //   const state = thunk_Api.getState();

      //   const persistToken = state.auth.token;
      //   if (!persistToken) {
      //     return thunk_Api.rejectWithValue('No token');
      //   }
      const { data } = await Api.get('transaction-categories');
      console.log('getCategories: ', data);
      return data;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);
