import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Taken from here:
// https://reacttraining.com/react-router/web/example/auth-workflow
function PrivateRoute({ children, ...rest }) {
  function isLoggedIn() {
    return localStorage.getItem('isLoggedIn')
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
