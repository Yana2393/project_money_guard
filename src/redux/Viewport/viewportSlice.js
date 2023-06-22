import { createSlice } from '@reduxjs/toolkit';
// import {
//   loginUser,
//   refreshUser,
//   registrationUser,
//   userLogOut,
// } from './authOperations';

const initialState = {
  mobile: false,
  tablet: false,
  desktop: false,
};

export const viewportSlice = createSlice({
  name: 'viewport',
  initialState,
  reducers: {
    writeDownViewport: (state, { payload }) => {
      state.mobile = payload.mobile;
      state.tablet = payload.tablet;
      state.desktop = payload.desktop;
    },
  },
});

export const viewportReducer = viewportSlice.reducer;
export const { writeDownViewport } = viewportSlice.actions;
