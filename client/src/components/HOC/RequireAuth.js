import React from "react";
import { Redirect, useLocation, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location.pathname },
            }}
          />
        )
      }
    />
  );
};

export default RequireAuth;
