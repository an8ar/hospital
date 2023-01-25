import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import {
  SendVerificationRequest,
  SendVerificationResponse,
  ConfirmVerificationRequest,
  ConfirmVerificationResponse,
} from './types';

export const CHECKOUT_API_REDUCER_KEY = 'checkoutApi';
const checkoutApi = createApi({
  baseQuery,
  reducerPath: CHECKOUT_API_REDUCER_KEY,
  endpoints: (builder) => ({
    sendVerification: builder.mutation<SendVerificationResponse, SendVerificationRequest>({
      query: (sendData) => ({
        url: '/user/verification/send',
        method: 'POST',
        body: sendData,
      }),
      // transformResponse: (response:any) => response.verificationId,
    }),
    confirmVerification: builder.mutation<ConfirmVerificationResponse, ConfirmVerificationRequest>(
      {
        query: (confirmData) => ({
          url: '/user/verification/confirm',
          method: 'POST',
          body: confirmData,
        }),
      },
    ),
  }),
});
export default checkoutApi;
