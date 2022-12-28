import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    if (action.payload?.status === 500) toast.warn('Server error, retry later');
    if (action.error?.data?.message) toast.warn(action.error.data.message);
  }

  return next(action);
};
