import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import "./CreateEditTrip.css";
import { createTrip } from "../../../actions/tripActions";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import { useSelector, useDispatch } from "react-redux";

const CreateEditTrip = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_hour, setStart_hour] = useState("");
  const [end_hour, setEnd_hour] = useState("");
  const [space, setSpace] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [tripImage, setTripImage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const validator = () => {
    if (
      name &&
      description &&
      start_hour &&
      end_hour &&
      space &&
      price &&
      location &&
      tripImage
    ) {
      return true;
    } else {
      setError("All fields and an image is REQUIRED");
    }
    window.scroll(0, 0);
    return false;
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  const handleDateChange = (dateName, dateValue) => {
    if (dateName == "start_hour") {
      setStart_hour(dateValue);
    } else {
      setEnd_hour(dateValue);
    }
  };

  const fileChanged = (event) => {
    console.log(event.target.files[0]);
    setTripImage(event.target.files[0]);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const isValid = validator();
    if (isValid) {
      let data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("start_hour", start_hour);
      data.append("end_hour", end_hour);
      data.append("space", space);
      data.append("price", price);
      if (!!tripImage) {
        data.append("tripImage", tripImage, "tripImage");
      }
      data.append("location", location);
      dispatch(createTrip(data, history));
    } else {
      return;
    }
  };
  return (
    <div className="formContainer">
      <div className="headingCreate">
        <p> CREATE YOUR OWN TRIP </p>
      </div>
      {error ? (
        <h4 style={{ textAlign: "center", color: "red" }}>{error}</h4>
      ) : null}
      <form
        className="form"
        onSubmit={submitForm}
        encType="multipart/form-data"
      >
        <label>
          <input
            className="user_input"
            type="text"
            placeholder="Destination"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label>
          <textarea
            className="text_area"
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </label>

        <div>
          <TimePicker
            className="time"
            placeholder="Starting time"
            showSecond={false}
            onChange={(time) => handleDateChange("start_hour", time)}
            format="HH:mm"
          />
          <TimePicker
            className="time"
            placeholder="Ending time"
            showSecond={false}
            onChange={(time) => handleDateChange("end_hour", time)}
          />
        </div>

        <label>
          <input
            className="user_input"
            type="text"
            placeholder="Available space"
            name="space"
            value={space}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            className="user_input"
            type="text"
            placeholder="Departure Location"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            className="user_input"
            type="text"
            placeholder="Price per person"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </label>

        <label className="user_input">
          Select an image that describes your trip the best
          <input
            className="user_input"
            type="file"
            name="tripImage"
            /*               value={this.state.tripImage}
             */ onChange={fileChanged}
          />
        </label>

        <button className="bookNow" onSubmit={submitForm}>
          CREATE
        </button>
      </form>
    </div>
  );
};

export default withRouter(CreateEditTrip);
