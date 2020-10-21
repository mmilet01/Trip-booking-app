import React from "react";
import "./TripCard.css";
import { Link } from "react-router-dom";

const TripCard = (props) => {
  const trip = props.trip;

  let start = 0;
  let end = 0;
  let start_date;
  let end_date;
  if (trip.start_hour) {
    start_date = trip.start_hour.slice(0, 10);
    end_date = trip.end_hour.slice(0, 10);
    start = trip.start_hour.slice(12, 17);
    end = trip.end_hour.slice(12, 17);
  }

  const addDefaultSrc = (e) => {
    e.target.onError = null;
    e.target.src = "http://localhost:5000/uploads/default_image.jpg";
  };

  return (
    <div key={trip.id} className="tripp">
      <div className="tripImage">
        <Link to={"/trip/" + trip.id}>
          <img
            src={trip.image}
            onError={addDefaultSrc}
            className="trippImage"
            alt="tripimage"
          />
        </Link>
        <p className="price">Price : {trip.price} €</p>
      </div>
      <div className="info">
        <div className="info1">
          <p className="location">{trip.name}</p>
          <p>
            Created by:
            <Link to={"/profile/user/" + trip.UserId}> {trip.createdBy}</Link>
          </p>
        </div>
        <div className="infoFav">
          <p> Start: {start_date}</p>
          <p> End: {end_date}</p>
        </div>
      </div>
      <div className="info2">
        <Link to={"/trip/" + trip.id}>
          <div className="buttonDetails">
            <p>More details</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TripCard;
