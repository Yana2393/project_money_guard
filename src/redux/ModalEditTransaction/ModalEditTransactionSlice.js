import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

export const ModalEditTransactionSlice = createSlice({
  name: 'modalEditTransaction',
  initialState,
  reducers: {
    toggleEditOpen(state) {
      state.open = !state.open;
    },
  },
});

export const ModalEditTransactionReduser = ModalEditTransactionSlice.reducer;
export const { toggleEditOpen } = ModalEditTransactionSlice.actions;
