import React, { useEffect } from "react";
import "./Register.css";
import { Link, Redirect, withRouter, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userRegister, clearningErrors } from "../../../../actions/userActions";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm } from "react-hook-form";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 2px auto;
  border-color: red;
`;

const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { register, handleSubmit, watch, errors } = useForm();
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const loggingInUser = useSelector(
    (state) => state.loadingReducer.loggingInUser
  );

  useEffect(() => {
    dispatch(clearningErrors());
    return () => {};
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(userRegister(data));
  };

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
    <div className="register_page">
      <div className="login_form">
        <h1>Register form:</h1>
        <div className="form_wrapper">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="userInput"
              name="fullname"
              placeholder="Full name"
              ref={register({
                required: true,
              })}
            />
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
              ref={register({ required: true, minLength: 5 })}
            />

            {errors.email?.type === "required" && (
              <p style={{ color: "red" }}>Enter email</p>
            )}
            {errors.email?.type === "pattern" && (
              <p style={{ color: "red" }}>Invalid email address</p>
            )}
            {errors.password?.type === "required" && (
              <p style={{ color: "red" }}>Enter password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={{ color: "red" }}>
                Password must be atleast 5 characters long
              </p>
            )}
            {loggingInUser ? (
              <div className="login_button">
                <ClipLoader css={override} size={15} color={"#123abc"} />
              </div>
            ) : (
              <button type="submit" className="login_button">
                REGISTER
              </button>
            )}
            <div className="signup">
              <Link to="/login" className="signup">
                Already a member? Login !
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
