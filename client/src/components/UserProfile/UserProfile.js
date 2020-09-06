import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, clearUser } from "../../actions/userActions";
import { fetchTrips } from "../../actions/tripActions";
import { Redirect, useParams, useHistory, useLocation } from "react-router-dom";
import { TripCard } from "../Main/TripCard/TripCard";

const UserProfile = (props) => {
  console.log(props);
  const isFetching = useSelector((state) => state.tripReducer.isFetching);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const user = useSelector((state) => state.userReducer.user);
  const fetchedUser = useSelector((state) => state.userReducer.fetchedUser);
  const trips = useSelector((state) => state.tripReducer.trips);
  const userID = +useParams().id;
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUser(userID));
    if (trips.length < 1) {
      dispatch(fetchTrips());
    }
    return () => {
      clearUser();
    };
  }, fetchedUser);

  if (isFetching && !isLoggedIn) {
    return <div>LOADING COMPONENT</div>;
  }

  if (!isFetching && !isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location.pathname },
        }}
      />
    );
  }
  if (isLoggedIn && !isFetching && user.id === userID) {
    return (
      <Redirect
        to={{
          pathname: "/profile",
          state: { from: location.pathname },
        }}
      />
    );
  }

  let filteredTrips = [];
  // instead of filtering user trips like this -> since with large amount of data it is bad, we
  // make an endpoint for certain user trips at backend and fetch them that way
  // and then we dont have filtered trips but only trips inside this component
  if (isLoggedIn && !isFetching) {
    filteredTrips = trips
      .filter((trip) => {
        return trip.UserId === userID;
      })
      .map((trip) => {
        return (
          <TripCard
            key={trip.id}
            trip={trip}
            user={user}
            isLoggedIn={isLoggedIn}
          ></TripCard>
        );
      });
  }
  console.log("lol2", fetchedUser);

  let fetchedUserTrips = <div>WHY IS THIS SHOWN</div>;
  if (!!fetchedUser && !isFetching) {
    fetchedUserTrips = (
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
    );
  }
  return (
    <div class="userProfile">
      {fetchedUserTrips}
      <div className="myTripsHeading">
        <p>{fetchedUser.fullname} TRIPS</p>
      </div>
      <div className="tripsContainer">
        <div>{filteredTrips}</div>
      </div>
    </div>
  );
};

export default UserProfile;
/* {trips[0] ? <div className="trips">{trips}</div> : null}
 */

/* <div>
        {!!fetchedUser ? (
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
        ) : null}
      </div> */
