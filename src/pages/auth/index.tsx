import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { LoginPage } = lazyImport(() => import('./Login'), 'LoginPage');

export const AuthRoutes = [
  <Route path="/login" element={<LoginPage />} key="login" />,
];
