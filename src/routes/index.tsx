import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '~/pages/auth';
import { MiscRoutes } from '~/pages/misc';
import { SubmitRoutes } from '~/pages/submit-form';
import { lazyImport } from '~/utils/lazyImport';

const { Page404 } = lazyImport(() => import('~/pages/misc/Page404'), 'Page404');

export function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
      <Routes>
        {MiscRoutes}
        {AuthRoutes}
        {SubmitRoutes}
        <Route path="*" element={<Page404 />} key="404" />
      </Routes>
    </BrowserRouter>
  );
}
