import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

export const ModalAddOpenSlice = createSlice({
  name: 'modalAddOpen',
  initialState,
  reducers: {
    toggleOpenAdd(state) {
      state.open = !state.open;
    },
  },
});

export const ModalAddOpenReduser = ModalAddOpenSlice.reducer;
export const { toggleOpenAdd } = ModalAddOpenSlice.actions;
