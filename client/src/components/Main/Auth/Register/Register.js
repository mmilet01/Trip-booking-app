import React, { Component } from "react";
import "./Register.css";
import { Link, Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { userRegister, clearningErrors } from "../../../../actions/userActions";

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      fullnameError: "",
      email: "",
      emailError: "",
      password: "",
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
      });
      return false;
    } else if (this.state.password.length < 5) {
      this.setState({
        ...this.state,
        emailError: "",
        passwordError: "Password needs to be atleast 6 characters long",
      });
      return false;
    } else if (this.state.fullname.length < 3) {
      this.setState({
        ...this.state,
        emailError: "",
        passwordError: "",
        fullnameError: "Please enter your full name",
      });
      return false;
    }
    this.setState({
      ...this.state,
      fullnameError: "",
      emailError: "",
      passwordError: "",
    });
    return true;
  }
  formSubmit(e) {
    e.preventDefault();
    this.props.clearningErrors();

    const isValid = this.validate();
    if (isValid) {
      this.props.userRegister(this.state);
    }
  }

  componentDidMount() {
    this.props.clearningErrors();
  }

  render() {
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
      <div className="register_page">
        <div className="login_form">
          <h1>Register form:</h1>
          <div className="form_wrapper">
            <form className="form" onSubmit={this.formSubmit}>
              <label>
                <input
                  className="userInput"
                  type="text"
                  placeholder="Fullname"
                  name="fullname"
                  value={this.state.fullname}
                  onChange={this.handleChange}
                />
              </label>

              <label>
                <input
                  className="userInput"
                  type="email"
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
              {this.state.fullnameError ? (
                <p style={{ color: "red" }}>{this.state.fullnameError}</p>
              ) : null}
              {this.props.errorMsg ? (
                <p style={{ color: "red" }}>{this.props.errorMsg}</p>
              ) : null}
              <button className="login_button" onClick={this.formSubmit}>
                REGISTER
              </button>
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
  }
}

const mapStateToProps = (state) => ({
  errorMsg: state.userReducer.errorMsg,
  isLoggedIn: state.loadingReducer.isLoggedIn,
});

export default connect(mapStateToProps, { userRegister, clearningErrors })(
  withRouter(Register)
);
