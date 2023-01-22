import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { CityResponse, CityRequest } from './types';

export const CITY_API_REDUCER_KEY = 'citiApi';

const cityApi = createApi({
  reducerPath: CITY_API_REDUCER_KEY,
  baseQuery,
  endpoints: (builder) => ({
    getCities: builder.query<CityResponse[], CityRequest >({
      query: () => ({
        url: '/cities',
        method: 'GET',
      }),
    }),
  }),
});

export default cityApi;
