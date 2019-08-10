import React, { Component } from "react";
import "./TripList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateTrip from "../CreateTrip/CreateTrip";

export class TripList extends Component {
  constructor() {
    super();
    this.state = {
      trips: []
    };
  }

  componentWillMount() {
    axios
      .get("/api/trips")
      .then(res => {
        console.log("Success", res);
        this.setState({
          ...this.state,
          trips: res.data
        });
      })
      .catch(err => console.log("Error", err));
  }
  render() {
    console.log(!!this.state.trips[0]);
    let trips = this.state.trips.map(trip => {
      return (
        <div key={trip.id} className="tripp">
          <div className="tripImage">
            <Link to={"/trip/" + trip.id}>
              <img
                className="trippImage"
                src={"http://localhost:5000/" + trip.image}
                alt=""
              />
            </Link>
          </div>
          <div className="info">
            <div className="info1">
              <p className="location">{trip.location}</p>
              <p>Start : {trip.date}</p>
              <p>Price : {trip.price} €</p>
              <p>Tickets left : {trip.freeSpace}</p>
              <p>Duration : {trip.duration} days</p>
              <Link to={"/trip/" + trip.id}>
                <div className="buttonDetails">
                  <p>More details</p>
                </div>
              </Link>
            </div>
            <div className="infoFav">
              <i class="fas fa-heart fa-lg" />
            </div>
          </div>
        </div>
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
          <p>────────────────────────── TRIPS ──────────────────────────</p>
        </div>
        <div className="tripsContainer">
          {!!this.state.trips[0] ? (
            <div className="trips">{trips}</div>
          ) : (
            <div>
              <h2>NO AVAILABLE TRIPS, CREATE ONE</h2>
              <CreateTrip />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TripList;
