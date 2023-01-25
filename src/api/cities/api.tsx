import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { GetCitiesResponse } from './type';

export const CITIES_API_REDUCER_KEY = 'citiesApi';

const citiesApi = createApi({
  baseQuery,
  reducerPath: CITIES_API_REDUCER_KEY,
  endpoints: (builder) => ({
    getCheckoutCities: builder.query<GetCitiesResponse, void>({
      query: () => '/cities',
    }),
  }),
});
export default citiesApi;
