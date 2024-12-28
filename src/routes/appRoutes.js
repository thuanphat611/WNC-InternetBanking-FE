import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ comp: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const public_routes = [
  {
    path: "/login",
    routetype: Route,
    component: LoginConnect,
  },
];
