import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { ProcedureResponse } from './types';

export const PROCEDURES_API_REDUCER_KEY = ' proceduresAPI';

const procedureApi = createApi({
  baseQuery,
  reducerPath: PROCEDURES_API_REDUCER_KEY,
  endpoints: (builder) => ({
    getProcedures: builder.query<ProcedureResponse[], null>({
      query: () => ({
        url: '/procedures',
        method: 'GET',
      }),
    }),
  }),
});

export default procedureApi;
