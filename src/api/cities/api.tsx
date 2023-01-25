import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { GetCitiesResponseArray } from './type';

export const CITIES_API_REDUCER_KEY = 'citiesApi';

const citiesApi = createApi({
  baseQuery,
  reducerPath: CITIES_API_REDUCER_KEY,
  endpoints: (builder) => ({
    getCheckoutCities: builder.query<GetCitiesResponseArray, void>({
      query: () => '/cities',
    }),
  }),
});
export default citiesApi;
