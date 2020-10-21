import React, { useState, useEffect } from "react";
import { withRouter, useHistory, useParams } from "react-router-dom";
import "./CreateEditTrip.css";
import {
  createTrip,
  clearTrip,
  fetchSingleTrip,
  editTrip,
} from "../../../actions/tripActions";
import { useSelector, useDispatch } from "react-redux";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { ErrorMessage } from "@hookform/error-message";

const override = css`
  display: block;
  margin: 10% auto;
  border-color: red;
`;

const CreateEditTrip = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm();
  const tripID = +useParams().id;
  const [isEdit, setIsEdit] = useState(false);
  const trip = useSelector((state) => state.tripReducer.trip);
  const loadingSingleTrip = useSelector(
    (state) => state.loadingReducer.loadingSingleTrip
  );

  useEffect(() => {
    if (tripID) {
      setIsEdit(true);
      dispatch(fetchSingleTrip(tripID));
    }
    return () => {
      dispatch(clearTrip());
    };
  }, [dispatch, tripID]);

  if (loadingSingleTrip) {
    return <ClipLoader css={override} size={150} color={"#123abc"} />;
  }

  const submitForm = (values) => {
    const startDate = new Date(values.start).toLocaleString();
    const endDate = new Date(values.end).toLocaleString();
    const data = {
      ...values,
      tripImage: values.tripImage[0],
      start: startDate,
      end: endDate,
    };
    let form_data = new FormData();

    for (let key in data) {
      form_data.append(key, data[key]);
    }
    if (isEdit) dispatch(editTrip(form_data, tripID, history));
    else dispatch(createTrip(form_data, history));
  };

  let start;
  let end;

  if (isEdit && trip) {
    start = new Date(trip.start_hour);
    end = new Date(trip.end_hour);
  }

  return (
    <div className="formContainer">
      <div className="headingCreate">
        {isEdit ? <p>Edit trip</p> : <p>Create new trip</p>}
      </div>
      <form
        className="form"
        onSubmit={handleSubmit(submitForm)}
        encType="multipart/form-data"
      >
        <label>
          Name of the trip
          {errors.name?.type === "required" && (
            <span style={{ color: "red" }}> Name is required</span>
          )}
        </label>
        <input
          className="user_input"
          type="text"
          placeholder="Name"
          name="name"
          defaultValue={isEdit ? trip.name : ""}
          ref={register({ required: true })}
        />
        <label>Description</label>
        <textarea
          className="text_area"
          type="text"
          placeholder="Description"
          name="description"
          defaultValue={isEdit ? trip.description : ""}
        />
        <ErrorMessage
          errors={errors}
          name="start"
          render={({ message }) => <p>{message}</p>}
        />
        <ErrorMessage
          errors={errors}
          name="end"
          render={({ message }) => <p>{message}</p>}
        />
        {errors.start && (
          <span style={{ color: "red" }}> Start date is required</span>
        )}
        {errors.end && (
          <span style={{ color: "red" }}> End date is required</span>
        )}
        <div className="dates">
          <Controller
            control={control}
            name="start"
            ref={register({ required: true })}
            defaultValue={isEdit ? start : null}
            rules={{ required: true }}
            render={({ onChange, onBlur, value }) => (
              <ReactDatePicker
                placeholderText="Start date and time"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            )}
          />
          <Controller
            control={control}
            name="end"
            ref={register({ required: true })}
            defaultValue={isEdit ? end : null}
            rules={{ required: true }}
            render={({ onChange, onBlur, value, name }) => (
              <ReactDatePicker
                placeholderText="End date and time"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            )}
          />
        </div>
        <label>
          Number of people
          {errors.space?.type === "required" && (
            <span style={{ color: "red" }}> Field is required</span>
          )}
        </label>
        <input
          className="user_input"
          type="number"
          placeholder="Available space"
          name="space"
          defaultValue={isEdit ? trip.freespace : null}
          ref={register({ required: true })}
        />
        <label>
          Price in euros €
          {errors.price?.type === "required" && (
            <span style={{ color: "red" }}> Price is required</span>
          )}
        </label>
        <input
          className="user_input"
          type="number"
          placeholder="Price per person"
          name="price"
          defaultValue={isEdit ? trip.price : null}
          ref={register({ required: true })}
        />
        <label>
          Location
          {errors.location?.type === "required" && (
            <span style={{ color: "red" }}> Location is required</span>
          )}
        </label>
        <input
          className="user_input"
          type="text"
          placeholder="Destination"
          name="location"
          defaultValue={isEdit ? trip.location : null}
          ref={register({ required: true })}
        />
        {errors.tripImage && (
          <span style={{ color: "red" }}> Uploading image is required</span>
        )}
        <label for="file-upload" className="custom-file-upload">
          {isEdit ? <span>Edit image</span> : <span>Upload image</span>}
          <i class="fas fa-upload"></i>
        </label>
        <input
          id="file-upload"
          type="file"
          name="tripImage"
          ref={register({ required: isEdit ? false : true })}
        />
        <button className="bookNow" type="submit">
          {!isEdit ? <span>Create</span> : <span>Edit</span>}
        </button>
      </form>
    </div>
  );
};

export default withRouter(CreateEditTrip);
