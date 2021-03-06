import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, clearUser } from "../../actions/userActions";
import { fetchUserTrips } from "../../actions/tripActions";
import { Redirect, useParams, useLocation } from "react-router-dom";
import TripCard from "../Main/TripCard/TripCard";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const UserProfile = () => {
  const fetchingUserTrips = useSelector(
    (state) => state.loadingReducer.loadingUserTrips
  );
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
    dispatch(fetchUser(userID));
    dispatch(fetchUserTrips(userID));
    return () => {
      dispatch(clearUser());
    };
  }, [userID, dispatch]);

  if (fetchingUserTrips || loadingUserData) {
    return <LoadingComponent size={150} color={"#123abc"} />;
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
