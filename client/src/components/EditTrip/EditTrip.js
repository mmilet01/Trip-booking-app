import React, { Component, useEffect } from "react";
import "./EditTrip.css";
import TimePicker from "rc-time-picker";
import { editTrip } from "../../actions/tripActions";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import moment from "moment";

import "rc-time-picker/assets/index.css";

class EditTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.trip.name ? this.props.trip.name : "",
      description: this.props.trip.description
        ? this.props.trip.description
        : "",
      start_hour: this.props.trip.start_hour ? this.props.trip.start_hour : "",
      end_hour: this.props.trip.end_hour ? this.props.trip.end_hour : "",
      space: this.props.trip.freespace ? this.props.trip.freespace : "",
      price: this.props.trip.price ? this.props.trip.price : "",
      location: this.props.trip.location ? this.props.trip.location : "",
      id: this.props.trip.id,
      tripImage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }
  handleDateChange(dateName, dateValue) {
    this.setState({
      ...this.state,
      [dateName]: dateValue,
    });
  }

  fileChanged = (event) => {
    this.setState({
      ...this.state,
      tripImage: event.target.files[0],
    });
  };

  submitForm(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("name", this.state.name);
    data.append("description", this.state.description);
    data.append("start_hour", this.state.start_hour);
    data.append("end_hour", this.state.end_hour);
    data.append("space", this.state.space);
    data.append("price", this.state.price);
    data.append("location", this.state.location);
    if (this.state.tripImage) {
      data.append("tripImage", this.state.tripImage, "tripImage");
    }
    this.props.editTrip(data, this.state.id, this.props.history);
    // zasto mi ode this.props.trip bude prazan objekt a u constructoru ne
  }

  render() {
    return (
      <div className="formContainer">
        <div className="headingCreate">
          <p>EDIT TRIP</p>
        </div>

        <form
          className="form"
          onSubmit={this.submitForm}
          encType="multipart/form-data"
        >
          <label>
            <input
              className="user_input"
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <textarea
              className="text_area"
              type="text"
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <div>
            <TimePicker
              placeholder="Starting time"
              className="time"
              showSecond={false}
              onChange={(time) => this.handleDateChange("start_hour", time)}
              defaultValue={moment(this.state.start_hour)}
            />
            <TimePicker
              placeholder="Ending time"
              className="time"
              showSecond={false}
              onChange={(time) => this.handleDateChange("end_hour", time)}
              defaultValue={moment(this.state.end_hour)}
            />
          </div>
          <label>
            <input
              className="user_input"
              type="text"
              placeholder="Space"
              name="space"
              value={this.state.space}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              className="user_input"
              type="text"
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Price:
            <input
              className="user_input"
              type="text"
              placeholder="Price $"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Select a tripImage that describes your trip the best
            <input
              className="user_input"
              type="file"
              name="tripImage"
              /*               value={this.state.tripImage}
               */ onChange={this.fileChanged}
            />
          </label>
          <button className="bookNow" onSubmit={this.submitForm}>
            Edit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  trip: state.tripReducer.trip,
});
export default connect(mapStateToProps, { editTrip })(withRouter(EditTrip));
