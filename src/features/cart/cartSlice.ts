import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { CartProcedure } from './types';

interface CartState {
    procedures: CartProcedure[],
}

const initialState: CartState = {
  procedures: [],
};
function includes(cart: CartProcedure[], procedure: CartProcedure): boolean {
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].id === procedure.id) {
      return true;
    }
  }
  return false;
}

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProcedure>) {
      if (state.procedures.some((procedure) => procedure.id === action.payload.id)) {
        state.procedures = state.procedures.map((procedure) => {
          if (procedure.id === action.payload.id) {
            return { ...procedure, quantity: procedure.quantity + 1 };
          }
          return { ...procedure };
        });
      } else {
        state.procedures.push(action.payload);
      }
    },
    removeAll(state) {
      state.procedures = [];
    },
    removeProcedure(state, action: PayloadAction<CartProcedure>) {
      const items = state.procedures.filter((procedure) => procedure.id !== action.payload.id);
      state.procedures = items || [];
    },
    decrementCount(state, action: PayloadAction<CartProcedure>) {
      state.procedures = state.procedures.map((procedure) => {
        if (procedure.id === action.payload.id) {
          if (procedure.quantity >= 2) {
            return { ...procedure, quantity: procedure.quantity - 1 };
          }

          return { ...procedure, quantity: 0 };
        }
        return { ...procedure };
      });
      const items = state.procedures.filter((procedure) => procedure.quantity !== 0);
      state.procedures = items || [];
    },
  },
});

export const {
  addToCart, removeAll, removeProcedure, decrementCount,
} = cartSlice.actions;

export const cartReducer = persistReducer(
  {
    key: 'rtk:cart',
    storage,
    whitelist: ['procedures'],
  },
  cartSlice.reducer,
);
