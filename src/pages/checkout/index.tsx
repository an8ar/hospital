import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { CheckoutPage } = lazyImport(() => import('./Checkout'), 'CheckoutPage');
const { CheckoutConfirmation } = lazyImport(
  () => import('./CheckoutConfirmation'),
  'CheckoutConfirmation',
);

export const CheckoutRoutes = [
  <Route
    path="/checkout"
    element={<CheckoutPage />}
    key="checkout"
  />,
  <Route
    path="/checkoutConfirmation"
    element={<CheckoutConfirmation />}
    key="/checkoutConfirmation"
  />,
];
