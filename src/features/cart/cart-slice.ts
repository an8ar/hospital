import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { Procedure } from '../procedures';
import { CartProcedure } from './types';

interface CartState {
    procedures: CartProcedure[],
}

const initialState: CartState = {
  procedures: [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Procedure>) {
      const index = state.procedures.findIndex((item) => item.id === action.payload.id);
      if (index === -1) {
        state.procedures.push({ ...action.payload, quantity: 1 });
      } else {
        state.procedures[index].quantity += 1;
      }
    },
    removeAll(state) {
      state.procedures = [];
    },
    removeProcedure(state, action: PayloadAction<Procedure>) {
      const items = state.procedures.filter((procedure) => procedure.id !== action.payload.id);
      state.procedures = items || [];
    },
    decrementQuantity(state, action: PayloadAction<Procedure>) {
      const index = state.procedures.findIndex((item) => item.id === action.payload.id);
      if (state.procedures[index].quantity === 1) {
        state.procedures.splice(index, 1);
      } else {
        state.procedures[index].quantity -= 1;
      }
    },
  },
});

export const {
  addToCart, removeAll, removeProcedure, decrementQuantity,
} = cartSlice.actions;

export const cartReducer = persistReducer(
  {
    key: 'rtk:cart',
    storage,
    whitelist: ['procedures'],
  },
  cartSlice.reducer,
);
