import React, { useEffect } from "react";
import "./TripDetails.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useHistory } from "react-router";
import {
  fetchSingleTrip,
  deleteTrip,
  clearTrip,
} from "../../../actions/tripActions";
import Comments from "./Comments/Comments.js";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 10% auto;
  border-color: red;
`;

const TripDetails = () => {
  const tripID = +useParams().id;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user);
  const trip = useSelector((state) => state.tripReducer.trip);
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const loadingSingleTrip = useSelector(
    (state) => state.loadingReducer.loadingSingleTrip
  );

  useEffect(() => {
    dispatch(fetchSingleTrip(tripID));
    return () => {
      dispatch(clearTrip());
    };
  }, [dispatch, tripID]);

  const deletingTrip = (e) => {
    e.preventDefault();
    dispatch(deleteTrip(tripID, history));
  };

  const addDefaultSrc = (e) => {
    e.target.onError = null;
    e.target.src = "http://localhost:5000/uploads/default_image.jpg";
  };

  if (loadingSingleTrip) {
    return <ClipLoader css={override} size={150} color={"#123abc"} />;
  }

  let duration = 0;
  let start_hour = 0;
  let end_hour = 0;
  if (trip.start_hour) {
    start_hour = trip.start_hour.slice(16, 21);
    end_hour = trip.end_hour.slice(16, 21);
    const start = start_hour.slice(0, 2);
    const end = end_hour.slice(0, 2);
    duration = end - start;
  }
  return (
    <div className="tripDetailsContainer">
      <div className="detailsImg">
        <img
          src={"http://localhost:5000/" + trip.image}
          onError={addDefaultSrc}
          alt=""
        />
      </div>
      <div className="infoGlavni">
        <div className="firstRow">
          <div className="faDiv">
            <i className="fas fa-map-marker-alt fa-2x" />
            <p>{trip.location}</p>
          </div>
          <div className="faDiv">
            <i className="fas fa-hourglass-start fa-2x" />
            <p>{duration} hours</p>
          </div>
        </div>
        <div className="secondRow">
          <div className="faDiv">
            <i className="fas fa-tag fa-2x" />
            <p>{trip.price} kn</p>
          </div>

          <div className="faDiv">
            <i className="fas fa-ticket-alt fa-2x" />
            <p>{trip.freespace} places left</p>
          </div>
        </div>
        <div className="thirdRow">
          <div className="faDiv">
            <i className="far fa-calendar-alt fa-2x" />
            <div>
              <p> Start: {start_hour}h</p>
              <p> End: {end_hour}h</p>
            </div>
          </div>
          <div className="faDiv">
            <i className="fas fa-user-tie fa-2x" />
            <p>
              Posted by:
              <Link to={"/profile/user/" + trip.UserId}>{trip.createdBy}</Link>
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="tripDescription">
        <p>{trip.description}</p>
      </div>
      <br />
      <br />

      {isLoggedIn ? (
        <div>
          {trip.UserId === user.id ? (
            <div className="botuni">
              <button className="bookNow" onClick={deletingTrip}>
                Delete
              </button>
              <Link to={"/edit/" + trip.id}>
                <button className="bookNow">Edit</button>
              </Link>
            </div>
          ) : (
            <p>
              <button className="bookNow">BOOK NOW</button>
            </p>
          )}
        </div>
      ) : null}
      <hr />
      <Comments />
    </div>
  );
};

export default withRouter(TripDetails);
