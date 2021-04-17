import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { tokenStored } from './utils';

interface ProtectedRouteI {
  path: string;
  children: React.ReactChild;
}

export default function AuthenticatedRoute({
  path,
  children,
}: ProtectedRouteI) {
  return (
    <Route
      path={path}
      render={(routeProps: any) =>
        tokenStored() ? children : <Redirect to={'/login'} />
      }
    />
  );
}
