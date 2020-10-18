import React, { useEffect } from "react";
import "./Login.css";
import {
  Link,
  withRouter,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, clearningErrors } from "../../../../actions/userActions";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm } from "react-hook-form";

const override = css`
  display: block;
  margin: 2px auto;
  border-color: red;
`;

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const loggingInUser = useSelector(
    (state) => state.loadingReducer.loggingInUser
  );

  useEffect(() => {
    dispatch(clearningErrors());
    return () => {};
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };

  if (history.replace.name === "replace" && isLoggedIn) {
    if (location.state) {
      let path = location.state.from;
      return (
        <Redirect
          to={{
            pathname: path,
            state: { from: location.pathname },
          }}
        />
      );
    }
  }
  if (isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/profile",
          state: { from: location.pathname },
        }}
      />
    );
  }
  return (
    <div className="login_page">
      <div className="login_form">
        <h1>Login form:</h1>
        <div className="form_wrapper">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="userInput"
              name="email"
              placeholder="Email"
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
              })}
            />
            <input
              className="userInput"
              name="password"
              placeholder="Password"
              type="password"
              ref={register({ required: true })}
            />
            {errors.email?.type === "required" && (
              <p style={{ color: "red" }}>Enter email</p>
            )}
            {errors.email?.type === "pattern" && (
              <p style={{ color: "red" }}>Invalid email address</p>
            )}
            {errors.password && <p style={{ color: "red" }}>Enter password</p>}
            {loggingInUser ? (
              <div className="login_button">
                <ClipLoader css={override} size={15} color={"#123abc"} />
              </div>
            ) : (
              <button type="submit" className="login_button">
                LOGIN
              </button>
            )}
            <div className="signup">
              <Link to="/register" className="signup">
                Dont have an account? Sign up !
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
