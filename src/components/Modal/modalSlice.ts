import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  toggle: 'open' | 'close'
}

const initialState: ModalState = {
  toggle: 'close',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
      toggleModal: (state, action: PayloadAction<ModalState['toggle']>) => {
        state.toggle = action.payload
      }
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;