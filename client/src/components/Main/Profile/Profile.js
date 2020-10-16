import React, { useEffect } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTrips } from "../../../actions/tripActions";
import TripCard from "../TripCard/TripCard.js";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 10% auto;
  border-color: red;
`;

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user_trips = useSelector((state) => state.tripReducer.user_trips);
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const loadingUserTrips = useSelector(
    (state) => state.loadingReducer.loadingUserTrips
  );
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) dispatch(fetchUserTrips(user.id));
    return () => {};
  }, [dispatch, user]);

  if (loadingUserTrips) {
    return <ClipLoader css={override} size={150} color={"#123abc"} />;
  }

  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location.pathname },
        }}
      />
    );
  }

  let myTrips = [];

  if (isLoggedIn) {
    myTrips = user_trips.map((trip) => {
      return <TripCard key={trip.id} trip={trip} user={user}></TripCard>;
    });

    myTrips.push(
      <div className="tripp" id="addCard">
        <Link className="addCard" to="/createTrip">
          <h4>Create another trip!</h4>
          <i class="fas fa-plus fa-2x" />
        </Link>
      </div>
    );
  }
  return (
    <div className="profilContainer">
      <div className="profilInfo">
        <div className="profilImg">
          <div className="profilImg1">
            <img
              src="http://localhost:3000/images/placeimg_640_480_any.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="profilInfo1">
          <p>
            <b>Name</b>: {user.fullname}
          </p>
          <p>
            <b>Contact</b>: {user.email}
          </p>
        </div>
      </div>
      <div className="myTrips">
        <div className="myTripsHeading">
          <p>MY TRIPS</p>
        </div>
        <div className="tripList">{myTrips}</div>
      </div>
    </div>
  );
};

export default Profile;
