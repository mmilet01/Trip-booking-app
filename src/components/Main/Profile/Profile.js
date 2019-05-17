import React, { Component } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      trips: []
    };
  }
  componentDidMount() {
    let trips = require("../../../trips.json");
    console.log(trips);
    this.setState({
      ...this.state,
      trips: trips
    });
  }

  render() {
    let trips = this.state.trips.slice(0, 2).map(trip => {
      return (
        <div key={trip.trip_id} className="tripp">
          <div className="tripImage">
            <Link to={"/post/" + trip.trip_id}>
              <img
                className="trippImage"
                src={"http://localhost:3000/images/" + trip.image}
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
              <Link to={"/post/" + trip.trip_id}>
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

    trips.push(
      <div className="tripp" id="addCard">
        <i class="fas fa-plus fa-2x" />
      </div>
    );
    return (
      <div className="profilContainer">
        <div className="profilInfo">
          <div className="profilImg">
            <div className="profilImg1">
              <img src="http://localhost:3000/images/profil.jpg" alt="" />
            </div>
          </div>
          <div className="profilInfo1">
            <p>
              <b>Ime</b> : Mario Mileta
            </p>
            <p>
              <b>Spol</b>: M
            </p>
            <p>
              <b>Dob</b>: 30 godina
            </p>
            <p>
              <b>Zanimanje</b>: klaun
            </p>
            <p>
              <b>Firma</b> : LadiJaja d.o.o.
            </p>
          </div>
        </div>
        <div className="myTrips">
          <div className="myTripsHeading">
            <p>
              ────────────────────────── MY TRIPS ──────────────────────────
            </p>
          </div>
          <div className="myTripsTrips">{trips}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
