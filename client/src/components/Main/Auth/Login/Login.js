import React, { useEffect, useState } from "react";
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

const override = css`
  display: block;
  margin: 2px auto;
  border-color: red;
`;

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const errorMsg = useSelector((state) => state.userReducer.errorMsg);
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const loggingInUser = useSelector(
    (state) => state.loadingReducer.loggingInUser
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const validate = () => {
    if (!email.includes("@")) {
      setEmailError("Email must include @");
      return false;
    }
    setEmailError("");
    return true;
  };

  useEffect(() => {
    dispatch(clearningErrors());
    return () => {};
  }, [dispatch, clearningErrors]);

  const formSubmit = (e) => {
    e.preventDefault();

    dispatch(clearningErrors());
    const isValid = validate();

    if (isValid) {
      const state = { email, password };
      dispatch(userLogin(state));
    }
  };

  if (history.replace.name == "replace" && isLoggedIn) {
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
          <form className="form" onSubmit={formSubmit}>
            <label>
              <input
                className="userInput"
                type="text"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <input
                className="userInput"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {emailError ? <p style={{ color: "red" }}>{emailError}</p> : null}
            {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
            {loggingInUser ? (
              <div className="login_button">
                <ClipLoader css={override} size={15} color={"#123abc"} />
              </div>
            ) : (
              <button className="login_button" onClick={formSubmit}>
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
