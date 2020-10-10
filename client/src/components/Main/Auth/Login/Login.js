import React, { Component } from "react";
import "./Login.css";
import { Link, withRouter, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { userLogin, clearningErrors } from "../../../../actions/userActions";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  validate() {
    if (!this.state.email.includes("@")) {
      this.setState({
        ...this.state,
        emailError: "Email must include @",
        loading: false,
      });
      return false;
    } else if (this.state.password.length < 5) {
      this.setState({
        ...this.state,
        emailError: "",
        passwordError: "Password needs to be atleast 6 characters long",
        loading: false,
      });
      return false;
    }
    this.setState({
      ...this.state,
      emailError: "",
      passwordError: "",
    });
    return true;
  }
  componentDidMount() {
    this.props.clearningErrors();
  }

  formSubmit(e) {
    e.preventDefault();

    this.props.clearningErrors();
    const isValid = this.validate();

    if (isValid) {
      this.props.userLogin(this.state);
      this.setState({
        ...this.state,
        loading: false,
        passwordError: "",
      });
    }
  }

  render() {
    if (this.props.history.replace.name == "replace" && this.props.isLoggedIn) {
      if (this.props.location.state) {
        let path = this.props.location.state.from;
        return (
          <Redirect
            to={{
              pathname: path,
              state: { from: this.props.location.pathname },
            }}
          />
        );
      }
    }
    if (this.props.isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/profile",
            state: { from: this.props.location.pathname },
          }}
        />
      );
    }
    return (
      <div className="login_page">
        <div className="login_form">
          <h1>Login form:</h1>
          <div className="form_wrapper">
            <form className="form" onSubmit={this.formSubmit}>
              <label>
                <input
                  className="userInput"
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>

              <label>
                <input
                  className="userInput"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>
              {this.state.passwordError ? (
                <p style={{ color: "red" }}>{this.state.passwordError}</p>
              ) : null}
              {this.state.emailError ? (
                <p style={{ color: "red" }}>{this.state.emailError}</p>
              ) : null}
              {this.props.errorMsg ? (
                <p style={{ color: "red" }}>{this.props.errorMsg}</p>
              ) : null}
              <button className="login_button" onClick={this.formSubmit}>
                LOGIN
              </button>
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
  }
}

const mapStateToProps = (state) => ({
  errorMsg: state.userReducer.errorMsg,
  isLoggedIn: state.loadingReducer.isLoggedIn,
});

export default connect(mapStateToProps, { userLogin, clearningErrors })(
  withRouter(Login)
);
