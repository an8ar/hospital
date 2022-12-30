// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import procedureApi from '~/api/home/api';

// import { Procedure } from './types';

// interface ProcedureState {
//     procedures: Procedure[],
//     selected: number
// }

// const initialState: ProcedureState = {
//   procedures: [],
//   selected: 0,
// };

// export const procedureSlice = createSlice({
//   name: 'procedureSlice',
//   initialState,
//   reducers: {
//     addProcedure(state, action: PayloadAction<number>) {
//       state.procedures[action.payload].added = true;
//       state.selected += 1;
//     },
//     removeProcedure(state, action: PayloadAction<number>) {
//       state.procedures[action.payload].added = false;
//       state.selected -= 1;
//     },
//     selectNumberOfCustomers(state, action: PayloadAction<number>) {
//       state.procedures[action.payload].added = false;
//       state.selected -= 1;
//     },

//   },
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       procedureApi.endpoints.getProcedures.matchFulfilled,
//       (state, { payload }) => {
//         for (let i = 0; i < payload.length; i++) {
//           state.procedures[i].createdAt = payload[i].createdAt;
//           state.procedures[i].description = payload[i].description;
//           state.procedures[i].id = payload[i].id;
//           state.procedures[i].name = payload[i].name;
//           state.procedures[i].slug = payload[i].slug;
//           state.procedures[i].updatedAt = payload[i].updatedAt;
//           state.procedures[i].specializationId = payload[i].specializationId;
//           state.procedures[i].added = false;
//           state.procedures[i].numberOfCustomers = 1;
//         }
//       },
//     );
//   },
// });

// export const { addProcedure, removeProcedure, selectNumberOfCustomers } = procedureSlice.actions;

// export const procedureReducer = persistReducer(
//   {
//     key: 'rtk:procedure',
//     storage,
//     whitelist: ['procedures'],
//   },
//   procedureSlice.reducer,
// );
export {};
