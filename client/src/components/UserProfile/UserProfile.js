import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, clearUser } from "../../actions/userActions";
import { fetchUserTrips } from "../../actions/tripActions";
import { Redirect, useParams, useLocation } from "react-router-dom";
import TripCard from "../Main/TripCard/TripCard";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 10% auto;
  border-color: red;
`;

const UserProfile = () => {
  const fetchingUserTrips = useSelector(
    (state) => state.loadingReducer.loadingUserTrips
  );
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const user = useSelector((state) => state.userReducer.user);
  const fetchedUser = useSelector((state) => state.userReducer.fetchedUser);
  const trips = useSelector((state) => state.tripReducer.user_trips);
  const userID = +useParams().id;
  const location = useLocation();
  const dispatch = useDispatch();
  const loadingUserData = useSelector(
    (state) => state.loadingReducer.loadingUserData
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUser(userID));
    dispatch(fetchUserTrips(userID));
    return () => {
      clearUser();
    };
  }, [userID, fetchUser, fetchUserTrips]);

  if (fetchingUserTrips || loadingUserData) {
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

  if (user.id === userID) {
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
    <div className="userProfile">
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
            <b>Name</b>: {fetchedUser.fullname}
          </p>
          <p>
            <b>Contact</b>: {fetchedUser.email}
          </p>
        </div>
      </div>
      <div className="myTripsHeading">
        <p>{fetchedUser.fullname} TRIPS</p>
      </div>
      <div className="tripsContainer">
        <div className="trips">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} user={user}></TripCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
