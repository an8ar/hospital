import React from 'react';

import { ToastContainer } from 'react-toastify';

import { AppRoutes } from './routes';

import 'react-toastify/dist/ReactToastify.css';
// scroll bar
import 'simplebar/src/simplebar.css';

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
