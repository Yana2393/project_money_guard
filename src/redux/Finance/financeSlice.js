import { createSlice } from '@reduxjs/toolkit';
// import {
//   loginUser,
//   refreshUser,
//   registrationUser,
//   userLogOut,
// } from './authOperations';

const initialState = {
  totalBalance: 0,
};

export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  extraReducers: builder => {},
});

export const financeReducer = financeSlice.reducer;
