import { createAsyncThunk } from '@reduxjs/toolkit';

import { Api } from 'redux/api/Api';
import { token } from 'redux/api/Api';

//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI1NTk1ZjYzMC01MzdjLTRhMmYtODNkZS0zZTYxZmNmMWFjOTYiLCJpYXQiOjE2ODczNjc2MTgsImV4cCI6MTAwMDAwMDE2ODczNjc2MTh9._O0KfgjoO0FLOyb1-86jJmYQZqe-v7bqSJICBdetj8M'

export const registrationUser = createAsyncThunk(
  'user/registration',
  async (user, thunk_Api) => {
    try {
      const { data } = await Api.post('auth/sign-up', user);
      token.set(data.token);
      return data;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'user/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const persistToken = state.auth.token;
    if (!persistToken) {
      return thunkAPI.rejectWithValue('No token');
    }
    try {
      token.set(persistToken);
      const { data } = await Api.get('users/current');
      return data;
    } catch (err) {
      token.unset();
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const userLogOut = createAsyncThunk(
  'user/logOut',
  async (_, thunkAPI) => {
    try {
      // token.set(persistToken);
      const { data } = await Api.delete('auth/sign-out');

      token.unset();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (user, thunk_Api) => {
    try {
      const { data } = await Api.post('auth/sign-in', user);

      token.set(data.token);
      return data;
    } catch (error) {
      return thunk_Api.rejectWithValue(error.message);
    }
  }
);
