import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';

import authApi, { AUTH_API_REDUCER_KEY } from '~/api/auth/api';
import procedureApi, { PROCEDURES_API_REDUCER_KEY } from '~/api/home/api';
import { authReducer, authSlice } from '~/features/auth';
import { cartReducer, cartSlice } from '~/features/cart';

import { RESET_STATE_ACTION_TYPE } from './actions/resetState';
import { rtkQueryErrorLogger } from './middlewares/rtkQueryErrorLogger';

const reducers = {
  [authSlice.name]: authReducer,
  [AUTH_API_REDUCER_KEY]: authApi.reducer,
  [cartSlice.name]: cartReducer,
  [PROCEDURES_API_REDUCER_KEY]: procedureApi.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<AppState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    // eslint-disable-next-line no-param-reassign
    state = {} as AppState;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat([authApi.middleware, rtkQueryErrorLogger]),
});

export const persistor = persistStore(store);

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
