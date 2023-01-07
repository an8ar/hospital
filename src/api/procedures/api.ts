import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { GetProceduresResponse, CreateProcedureRequest } from './types';

export const PROCEDURES_API_REDUCER_KEY = 'proceduresApi';

const procedureApi = createApi({
  baseQuery,
  reducerPath: PROCEDURES_API_REDUCER_KEY,
  endpoints: (builder) => ({
    getProcedures: builder.query<GetProceduresResponse, null>({
      query: () => ({
        url: '/procedures',
        method: 'GET',
      }),
    }),
    createProcedures: builder.mutation<null, CreateProcedureRequest>({
      query: (body) => ({
        url: '/patient/procedure-requests',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default procedureApi;
