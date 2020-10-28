import React, { useEffect } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTrips } from "../../../actions/tripActions";
import TripCard from "../TripCard/TripCard.js";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";

const Profile = () => {
  const dispatch = useDispatch();
  const user_trips = useSelector((state) => state.tripReducer.user_trips);
  const loadingUserTrips = useSelector(
    (state) => state.loadingReducer.loadingUserTrips
  );
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user) dispatch(fetchUserTrips(user.id));
    return () => {};
  }, [dispatch, user]);

  if (loadingUserTrips) {
    return <LoadingComponent size={150} color={"#123abc"} />;
  }

  const myTrips = user_trips.map((trip) => {
    return <TripCard key={trip.id} trip={trip} user={user}></TripCard>;
  });

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
        <div className="myTripsHeading">{myTrips ? <p>MY TRIPS</p> : null}</div>
        <div className="tripList">
          {myTrips}
          <div className="tripp" id="addCard">
            <Link className="addCard" to="/createTrip">
              <h4>Create another trip!</h4>
              <i class="fas fa-plus fa-2x" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
