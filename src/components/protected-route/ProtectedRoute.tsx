import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth';
import { PATH_AUTH } from '~/routes/paths';

type Props = {
  redirectPath?: string;
  children?: React.ReactElement;
};

export function ProtectedRoute({
  redirectPath = PATH_AUTH.login,
  children,
}: Props) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
}
