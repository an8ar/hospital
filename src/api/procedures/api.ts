import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { GetProceduresResponse } from './types';

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
  }),
});

export default procedureApi;
