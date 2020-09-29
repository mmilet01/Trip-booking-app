import React, { Component, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/Main/HomePage/HomePage";
import Profile from "./components/Main/Profile/Profile";
import Register from "./components/Main/Auth/Register/Register";
import Login from "./components/Main/Auth/Login/Login";
import TripList from "./components/Main/TripList/TripList";
import FavList from "./components/Main/FavList/FavList";
import TripDetails from "./components/Main/TripDetails/TripDetails";
import CreateTrip from "./components/Main/CreateTrip/CreateTrip";
import EditTrip from "./components/EditTrip/EditTrip";
import UserProfile from "./components/UserProfile/UserProfile";

import { Provider } from "react-redux";
import store from "./store/store";
import { userLoaded } from "./actions/userActions";

class App extends Component {
  componentWillMount() {
    store.dispatch(userLoaded());
  }
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="main_container">
            <Navbar />
            <Switch>
              <div className="content">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/profile/user/:id" component={UserProfile} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/trips" component={TripList} />
                <Route exact path="/favorite" component={FavList} />
                <Route exact path="/trip/:id" component={TripDetails} />
                <Route exact path="/edit/:id" component={EditTrip} />
                <Route exact path="/createTrip" component={CreateTrip} />
              </div>
            </Switch>
            <Footer />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
