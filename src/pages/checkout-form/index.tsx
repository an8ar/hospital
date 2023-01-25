import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { CheckoutPage } = lazyImport(() => import('./checkout'), 'CheckoutPage');

export const CheckoutRoutes = [
  <Route path="/checkout" element={<CheckoutPage />} key="checkout" />,
];
