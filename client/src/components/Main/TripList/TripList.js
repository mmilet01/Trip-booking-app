import React, { Component } from "react";
import "./TripList.css";
import { connect } from "react-redux";
import { fetchTrips } from "../../../actions/tripActions";

import TripCard from "../TripCard/TripCard";

export class TripList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      searchTerm: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrips();
    window.scrollTo(0, 0);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  render() {
    let trips = this.props.trips
      .filter((trip) => {
        if (
          trip.name.toUpperCase().includes(this.state.searchTerm.toUpperCase())
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map((trip) => {
        return (
          <TripCard key={trip.id} trip={trip} user={this.props.user}></TripCard>
        );
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
              value={this.state.searchTerm}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <hr />
        <div className="tripsContainer">
          <div className="trips">{trips}</div>
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
})(TripList);
