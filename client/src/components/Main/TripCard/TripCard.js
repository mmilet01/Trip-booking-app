import React, { Component } from "react";
import "./TripCard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../../actions/tripActions";
import Modal from "../../../Modal";

export class TripCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      likes: [],
      liked:
        this.props.user !== null
          ? this.props.trip.likes.find((name) => {
              console.log(name.userName, this.props.user.fullname);
              return name.userName === this.props.user.fullname;
            })
          : false,
    };
    this.liked = this.liked.bind(this);
    this.unliked = this.unliked.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  liked() {
    this.props.addLike(this.props.trip.id);
    this.setState({
      ...this.state,
      likes: [...this.state.likes, { userName: this.props.user.fullname }],
      liked: !this.state.liked,
    });
  }

  unliked() {
    this.props.removeLike(this.props.trip.id);
    this.setState({
      ...this.state,
      likes: this.state.likes.filter((likedBy) => {
        return likedBy.userName != this.props.user.fullname;
      }),
      liked: !this.state.liked,
    });
  }

  handleClose() {
    this.setState({
      ...this.state,
      show: !this.state.show,
    });
  }
  componentDidMount() {
    console.log(this.props);

    this.setState({
      ...this.state,
      likes: this.props.trip.likes,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({
        ...this.state,
        liked:
          this.props.user !== null
            ? this.props.trip.likes.find((name) => {
                console.log(name.userName, this.props.user.fullname);
                return name.userName === this.props.user.fullname;
              })
            : false,
      });
    }
  }

  toggleModal = () => {
    this.setState({ ...this.state, show: !this.state.show });
  };

  addDefaultSrc(e) {
    e.target.onError = null;
    e.target.src = "http://localhost:5000/uploads/default_image.jpg";
  }

  render() {
    let trip = this.props.trip;
    let duration = 0;
    let start_hour = 0;
    let end_hour = 0;
    if (this.props.trip.start_hour) {
      start_hour = this.props.trip.start_hour.slice(16, 21);
      end_hour = this.props.trip.end_hour.slice(16, 21);
      const start = start_hour.slice(0, 2);
      const end = end_hour.slice(0, 2);
      duration = end - start;
    }

    return (
      <div key={trip.id} className="tripp">
        <div className="tripImage">
          <Link to={"/trip/" + trip.id}>
            <img
              src={trip.image}
              onError={this.addDefaultSrc}
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

            <p className="plikes" onClick={this.toggleModal}>
              Likes: {this.props.trip.likes.length}
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
            {this.props.isLoggedIn ? (
              this.state.liked ? (
                <i
                  className="fas fa-thumbs-up fa-2x liked"
                  disabled={!this.props.isLoggedIn}
                  onClick={this.unliked}
                />
              ) : (
                <i
                  className="fas fa-thumbs-up fa-2x"
                  disabled={!this.props.isLoggedIn}
                  onClick={this.liked}
                />
              )
            ) : null}
          </div>
        </div>
        {this.state.show ? (
          <Modal id="modal">
            <div>
              {this.state.likes.map((like) => (
                <p>{like.userName}</p>
              ))}
              <button onClick={this.toggleModal}>Close</button>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps, { addLike, removeLike })(TripCard);
