import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { Page500 } = lazyImport(() => import('./Page500'), 'Page500');
const { Page403 } = lazyImport(() => import('./Page403'), 'Page403');
const { Page404 } = lazyImport(() => import('./Page404'), 'Page404');
const { HomePage } = lazyImport(() => import('./Home'), 'HomePage');

export const MiscRoutes = [
  <Route path="/" element={<HomePage />} key="home" />,
  <Route path="/403" element={<Page403 />} key="403" />,
  <Route path="/404" element={<Page404 />} key="404" />,
  <Route path="/500" element={<Page500 />} key="500" />,

];
