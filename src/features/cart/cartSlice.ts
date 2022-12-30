import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { CartProcedure } from './types';

interface CartType {
    cart: CartProcedure[],
}

const initialState: CartType = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProcedure>) {
      state.cart.push(action.payload);
    },
    removeAll(state) {
      state.cart = [];
    },
    removeProcedure(state, action: PayloadAction<CartProcedure>) {
      const insert = state.cart.filter((procedure) => procedure.id !== action.payload.id);
      if (insert === undefined) {
        state.cart = [];
      } else {
        state.cart = insert;
      }
    },
  },
});

export const { addToCart, removeAll, removeProcedure } = cartSlice.actions;

export const cartReducer = persistReducer(
  {
    key: 'rtk:cart',
    storage,
    whitelist: ['cart'],
  },
  cartSlice.reducer,
);
