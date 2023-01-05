import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { CheckoutPage } = lazyImport(() => import('./Checkout'), 'CheckoutPage');

export const CartRoutes = [
  <Route path="/checkout" element={<CheckoutPage />} key="checkout" />,
];
