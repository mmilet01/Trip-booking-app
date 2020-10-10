import React, { useState } from "react";
import "./TripCard.css";
import { Link } from "react-router-dom";
import { addLike, removeLike } from "../../../actions/tripActions";
import Modal from "../../../Modal";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 2px auto;
  border-color: red;
`;

const TripCard = (props) => {
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const dispatch = useDispatch();
  const likingInProgress = useSelector(
    (state) => state.loadingReducer.likingInProgress
  );
  const isLiked = props.trip.likes.find((likedBy) => {
    if (isLoggedIn) return likedBy.id == props.user.id;
    return false;
  });

  const [liked, setLiked] = useState(!!isLiked);
  const [show, setShow] = useState(false);

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

  const toggleModal = () => {
    setShow(!show);
  };

  const Like = () => {
    dispatch(addLike(trip.id));
    setLiked(!liked);
  };

  const Unlike = () => {
    dispatch(removeLike(trip.id));
    setLiked(!liked);
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

          <p className="plikes" onClick={toggleModal}>
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
            likingInProgress ? (
              <ClipLoader css={override} size={15} color={"#123abc"} />
            ) : liked ? (
              <i className="fas fa-thumbs-up fa-2x liked" onClick={Unlike} />
            ) : (
              <i className="fas fa-thumbs-up fa-2x" onClick={Like} />
            )
          ) : null}
        </div>
      </div>
      {show ? (
        <Modal id="modal">
          <div>
            {trip.likes.map((like) => (
              <p>{like.userName}</p>
            ))}
            <button onClick={toggleModal}>Close</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default TripCard;
