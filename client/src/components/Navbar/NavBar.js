import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { userLogout } from "../../actions/userActions";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    window.location.reload();
  };

  const user = useSelector((state) => state.userReducer.user);
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  return (
    <div>
      <header className="second_header">
        <div className="secondHeaderPart">
          <div className="logo">
            <Link to="/">
              <img src="http://localhost:3000/images/logo.png" alt="" />
            </Link>
          </div>
          <div className="tripss">
            <div className="h1">
              <Link to="/trips">TRIPS</Link>
            </div>
            <div className="h1">
              <div>
                {isLoggedIn ? (
                  <div className="ifLogin">
                    <div className="h2">
                      <Link to="/profile">{user.fullname}</Link>
                    </div>
                    <div className="logout" onClick={logout}>
                      Logout
                    </div>
                  </div>
                ) : (
                  <div className="ifLogin">
                    <div className="h2">
                      <Link to="/login">LOGIN</Link>
                    </div>
                    <div className="h2">
                      <Link to="/register">REGISTER</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
