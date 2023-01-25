import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { UserProcedureRequest } from './type';

export const USERS_API_REDUCER_KEY = 'usersApi';
const usersApi = createApi({
  baseQuery,
  reducerPath: USERS_API_REDUCER_KEY,
  endpoints: (builder) => ({
    userProcedureRequest: builder.mutation<null, UserProcedureRequest>({
      query: (data) => ({
        url: '/patient/procedure-requests',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
export default usersApi;
