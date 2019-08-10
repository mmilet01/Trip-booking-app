import React, { Component } from "react";
/* import "./CreateTrip.css";
 */ /* import TimePicker from "rc-time-picker";
 */ import axios from "axios";

class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      start_hour: "",
      end_hour: "",
      space: "",
      price: "",
      image: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    let id = +this.props.match.params.id;
    axios
      .get("/api/trips/show/" + id)
      .then(res => {
        console.log("trip fetched", res.data);
        this.setState({
          name: res.data.name,
          description: res.data.description,
          start_date: res.data.start_date,
          end_date: res.data.end_date,
          start_hour: res.data.start_hour,
          end_hour: res.data.end_hour,
          space: res.data.space,
          price: res.data.price,
          image: res.data.image
        });
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  submitForm(e) {
    e.preventDefault();
    console.log(e);
    console.log("SUBMITTING THE FORM");
    axios
      .post("/api/trips/edit" + this.state.id, this.state)
      .then(res => {
        console.log("Success");
        /*       window.location();
         */
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  render() {
    return (
      <div className="formContainer">
        <div className="headingCreate">
          <p>
            ───────────────────────── CREATE YOUR OWN TRIP
            ─────────────────────────
          </p>
        </div>

        <form className="form" onSubmit={this.submitForm}>
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
            <input
              className="user_input"
              type="text"
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              className="user_input"
              type="date"
              placeholder="Starting date"
              name="start_date"
              value={this.state.start_date}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              className="user_input"
              type="date"
              placeholder="Ending date"
              name="end_date"
              value={this.state.end_date}
              onChange={this.handleChange}
            />
          </label>
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
              type="time"
              placeholder="Starting hour"
              name="start_hour"
              value={this.state.start_hour}
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
            <input
              className="user_input"
              type="time"
              placeholder="Ending hour"
              name="end_hour"
              value={this.state.end_hour}
              onChange={this.handleChange}
              id="date"
            />
          </label>

          <label>
            Select an image that describes your trip the best
            <input
              className="user_input"
              type="file"
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
            />
          </label>

          <button className="createButton" onClick={this.submitForm}>
            CREATE
          </button>
        </form>
      </div>
    );
  }
}

export default CreateTrip;
