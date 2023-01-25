import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { CartProcedure } from './types';

 interface CartState {
    selectedProcedures: CartProcedure[],
}

const initialState: CartState = {
  selectedProcedures: [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProcedure: (state, action: PayloadAction<CartProcedure>) => {
      const index = state.selectedProcedures
        .findIndex((procedure) => procedure.id === action.payload.id) > -1;
      const procedures = state.selectedProcedures;
      if (index) {
        state.selectedProcedures = procedures;
      } else {
        state.selectedProcedures.push(action.payload);
      }
    },
    removeProcedure: (state, action: PayloadAction<CartProcedure>) => {
      state.selectedProcedures = state.selectedProcedures
        .filter((selectedProcedure) => selectedProcedure.id !== action.payload.id);
    },
    resetAll: (state) => {
      state.selectedProcedures = [];
    },
  },
});

export const {
  addProcedure,
  removeProcedure,
  resetAll,
} = cartSlice.actions;

export const cartReducer = persistReducer(
  {
    key: 'rtk:cart',
    storage,
    whitelist: ['selectedProcedures'],
  },
  cartSlice.reducer,
);
