import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import {
  PhoneVerificationConfirmParams,
  PhoneVerificationConfirmResponse,
  PhoneVerificationSendParams,
  PhoneVerificationSendResponse,
} from './types';

export const USER_API_REDUCER_KEY = 'userApi';

const userApi = createApi({
  baseQuery,
  reducerPath: USER_API_REDUCER_KEY,
  endpoints: (builder) => ({
    sendVerification: builder.query<PhoneVerificationSendResponse, PhoneVerificationSendParams>({
      query: (body) => ({
        url: '/user/verification/send',
        method: 'POST',
        body,
      }),
    }),
    confirmVerification: builder.query<
      PhoneVerificationConfirmResponse,
      PhoneVerificationConfirmParams
    >({
      query: (body) => ({
        url: '/user/verification/confirm',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default userApi;
