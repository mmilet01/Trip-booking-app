import React, { useEffect } from "react";
import "./HomePage.css";
import TripCard from "../TripCard/TripCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrips } from "../../../actions/tripActions";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 10% auto;
  border-color: red;
`;

const HomePage = () => {
  const trips = useSelector((state) => state.tripReducer.trips);
  const user = useSelector((state) => state.userReducer.user);
  const loadingTrips = useSelector(
    (state) => state.loadingReducer.loadingTrips
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrips());
    return () => {};
  }, [dispatch]);

  if (loadingTrips)
    return <ClipLoader css={override} size={150} color={"#123abc"} />;

  let sortedTrips = trips.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
  sortedTrips = sortedTrips.slice(0, 5);
  let topTrips = sortedTrips.map((trip) => {
    return <TripCard key={trip.id} trip={trip} user={user}></TripCard>;
  });
  return (
    <div className="homepage_container">
      <div className="header_container">
        <img src="http://localhost:3000/images/1.jpeg" alt="" />
      </div>
      <div className="heading">
        <p>TOP 5 TRIPS</p>
      </div>
      <div className="tripsContainer">
        <div className="bestTrips">{topTrips}</div>
      </div>
    </div>
  );
};

export default HomePage;
