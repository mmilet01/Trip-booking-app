import React, { Component } from "react";
import "./HomePage.css";
import TripCard from "../TripCard/TripCard";
import { connect } from "react-redux";
import { fetchTrips } from "../../../actions/tripActions";

export class HomePage extends Component {
  componentDidMount() {
    this.props.fetchTrips();
  }
  render() {
    let sortedTrips = this.props.trips.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    sortedTrips = sortedTrips.slice(0, 5);
    let trips = sortedTrips.map((trip) => {
      return (
        <TripCard key={trip.id} trip={trip} user={this.props.user}></TripCard>
      );
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
          <div className="bestTrips">{trips}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trips: state.tripReducer.trips,
  user: state.userReducer.user,
});

export default connect(mapStateToProps, {
  fetchTrips,
})(HomePage);
