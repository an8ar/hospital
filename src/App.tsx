import React, { useEffect } from 'react';

import { ToastContainer } from 'react-toastify';

import authApi from './api/auth/api';
import { AppRoutes } from './routes';
import { useAppSelector } from './store';

import 'react-toastify/dist/ReactToastify.css';
// scroll bar
import 'simplebar/src/simplebar.css';

function App() {
  const csrfToken = useAppSelector(({ authSlice }) => authSlice.csrf);
  const [trigger] = authApi.endpoints.getCSRFToken.useLazyQuery(); // load csrf token

  useEffect(() => {
    if (csrfToken === null) trigger(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csrfToken]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
