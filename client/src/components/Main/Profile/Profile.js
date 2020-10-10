import React, { useEffect } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../actions/userActions";
import { fetchTrips } from "../../../actions/tripActions";
import TripCard from "../TripCard/TripCard.js";

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.tripReducer.trips);
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchTrips());
    return () => {};
  }, [fetchTrips]);

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
  let fullname = "";
  let email = "";

  if (isLoggedIn) {
    myTrips = trips
      .filter((trip) => {
        return trip.UserId === user.id;
      })
      .map((trip) => {
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
    if (!!user) {
      fullname = user.fullname;
      email = user.email;
    }
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
            <b>Name</b>: {fullname}
          </p>
          <p>
            <b>Contact</b>: {email}
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
