import React, { Component } from "react";
import "./HomePage.css";

export class HomePage extends Component {
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
    console.log(this.state);
    let trips = this.state.trips.slice(0, 3).map(trip => {
      return (
        <div className="tripCard" id={"trip" + trip.trip_id} key={trip.trip_id}>
          <img
            className="tripImg"
            src={"http://localhost:3000/images/" + trip.image}
            alt=""
          />
          <div className="trophy">
            <img src="http://localhost:3000/images/best.png" alt="" />
          </div>
        </div>
      );
    });
    return (
      <div className="homepage_container">
        <div className="header_container">
          <img src="http://localhost:3000/images/home_background.jpg" alt="" />
          {/* <Link to="/trips">
            <div className="bookNow">BOOK NOW!!</div>
          </Link> */}
        </div>
        <div className="heading">
          <p>
            ────────────────────────── MOST POPULAR ──────────────────────────
          </p>
        </div>
        <div className="bestTrips">{trips}</div>

        {/* <div className="ponude">
          <Slideshow />
        </div> */}

        {/* <div className="topTrips">
          <div className="topTrips_heading">
            <h1>TOP TRIPS</h1>
          </div>
          <div className="topTrips_img">
            {trips}
          </div>
        </div> */}
      </div>
    );
  }
}

export default HomePage;
