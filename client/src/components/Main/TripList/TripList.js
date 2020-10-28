import React, { useState, useEffect } from "react";
import "./TripList.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrips } from "../../../actions/tripActions";
import TripCard from "../TripCard/TripCard";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";

const TripList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const trips = useSelector((state) => state.tripReducer.trips);
  const user = useSelector((state) => state.userReducer.user);
  const loadingTrips = useSelector(
    (state) => state.loadingReducer.loadingTrips
  );

  useEffect(() => {
    dispatch(fetchTrips());
    return () => {};
  }, [dispatch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loadingTrips) {
    return <LoadingComponent size={150} color={"#123abc"} />;
  }

  let filteredTrips = trips
    .filter((trip) => {
      if (trip.name.toUpperCase().includes(searchTerm.toUpperCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((trip) => {
      return <TripCard key={trip.id} trip={trip} user={user}></TripCard>;
    });

  return (
    <div>
      <div className="filter">
        <img
          className="triplistimg"
          src="http://localhost:3000/images/rafting.jpg"
          alt=""
        />
      </div>
      <div className="trips_heading">
        <label className="searchV">
          <input
            name="searchTerm"
            placeholder="Search Trips by Destination"
            value={searchTerm}
            onChange={handleChange}
          />
        </label>
      </div>
      <hr />
      <div className="tripsContainer">
        <div className="trips">{filteredTrips}</div>
      </div>
    </div>
  );
};

export default TripList;
