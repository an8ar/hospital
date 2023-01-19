import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { SubmitPage } = lazyImport(() => import('./submit'), 'SubmitPage');

export const SubmitRoutes = [
  <Route path="/submit" element={<SubmitPage />} key="submit" />,
];
