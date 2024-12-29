import React from "react";
import { Redirect, Route } from "react-router-dom";

import DefaultLayout from "../BankingUI/Components/Layout/DefaultLayout";

import Dashboard from "../BankingUI/Components/Banking/Dashboard/Dashboard";
import LogIn from "../BankingUI/Components/Authentication/Login/Login";
import LoginConnect from "../BankingUI/Components/Authentication/Login/LoginConnect";
import Register from "../BankingUI/Components/Authentication/Register/Register";
import ReceiverList from "../BankingUI/Components/Banking/ReceiverList/ReceiverList";

const PrivateRoute = ({ comp: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          // children
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

export const private_routes = [
  {
    path: "/",
    routetype: PrivateRoute,
    component: Dashboard,
    layout: DefaultLayout,
  },
  {
    path: "/edit",
    routetype: PrivateRoute,
    component: Register,
    layout: DefaultLayout,
  },
  {
    path: "/receivers",
    routetype: PrivateRoute,
    component: ReceiverList,
    layout: DefaultLayout,
  },
];
