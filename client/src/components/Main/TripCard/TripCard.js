import React, { useState } from "react";
import "./TripCard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../../actions/tripActions";
import Modal from "../../../Modal";
import { useSelector, useDispatch } from "react-redux";

const TripCard = (props) => {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const [liked, setLiked] = useState(true);
  const trip = props.trip;
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
          <p>Start: {start_hour}</p>
          <p>Duration: {duration}h</p>

          <p className="plikes" onClick="">
            Likes: {trip.likes.length}
          </p>
        </div>
      </div>
      <div className="info2">
        <Link to={"/trip/" + trip.id}>
          <div className="buttonDetails">
            <p>More details</p>
          </div>
        </Link>
        <div className="lajk">
          {isLoggedIn ? (
            liked ? (
              <i
                className="fas fa-thumbs-up fa-2x liked"
                disabled={!isLoggedIn}
              />
            ) : (
              <i className="fas fa-thumbs-up fa-2x" disabled={!isLoggedIn} />
            )
          ) : (
            <div>notlloggedin</div>
          )}
        </div>
      </div>
      {/*  {this.state.show ? (
        <Modal id="modal">
          <div>
            {this.state.likes.map((like) => (
              <p>{like.userName}</p>
            ))}
            <button onClick={this.toggleModal}>Close</button>
          </div>
        </Modal>
      ) : null} */}
    </div>
  );
};

export default TripCard;
