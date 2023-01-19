import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '.';

export const CITY_API_REDUCER_KEY = 'citiApi';

interface CityResponce {
    id: number,
    name: string,
    slug: string
}

const cityApi = createApi({
  reducerPath: CITY_API_REDUCER_KEY,
  baseQuery,
  endpoints: (builder) => ({
    getCities: builder.query<CityResponce[], null >({
      query: () => ({
        url: '/cities',
        method: 'GET',
      }),
    }),
  }),
});

export default cityApi;
