import { createSlice } from '@reduxjs/toolkit';
// import {
//   loginUser,
//   refreshUser,
//   registrationUser,
//   userLogOut,
// } from './authOperations';

const initialState = {
  transaction: [],
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: builder => {},
});

export const transactionReducer = transactionSlice.reducer;
