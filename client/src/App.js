import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/Main/HomePage/HomePage";
import Profile from "./components/Main/Profile/Profile";
import Register from "./components/Main/Auth/Register/Register";
import Login from "./components/Main/Auth/Login/Login";
import TripList from "./components/Main/TripList/TripList";
import TripDetails from "./components/Main/TripDetails/TripDetails";
import CreateEditTrip from "./components/Main/CreateEditTrip/CreateEditTrip";
import UserProfile from "./components/UserProfile/UserProfile";
import { userLoaded } from "./actions/userActions";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import ScrollToTop from "./components/HOC/ScrollToTop";
import RequireAuth from "./components/HOC/RequireAuth";

const override = css`
  display: block;
  margin: 10% auto;
  border-color: red;
`;

const App = () => {
  const dispatch = useDispatch();
  const loadingCurrentUser = useSelector(
    (state) => state.loadingReducer.loadingCurrentUser
  );

  useEffect(() => {
    dispatch(userLoaded());
    return () => {};
  }, [dispatch]);

  if (loadingCurrentUser) {
    return <ClipLoader css={override} size={150} color={"#123abc"} />;
  }

  return (
    <Router>
      <ScrollToTop>
        <div className="main_container">
          <Navbar />
          <Switch>
            <div className="content">
              <Route exact path="/" component={HomePage} />
              <RequireAuth exact path="/profile" component={Profile} />
              <RequireAuth
                exact
                path="/profile/user/:id"
                component={UserProfile}
              />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/trips" component={TripList} />
              <Route exact path="/trip/:id" component={TripDetails} />
              <Route exact path="/edit/:id" component={CreateEditTrip} />
              <Route exact path="/createTrip" component={CreateEditTrip} />
            </div>
          </Switch>
          <Footer />
        </div>
      </ScrollToTop>
    </Router>
  );
};

export default App;
