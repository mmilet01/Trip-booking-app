import React, { useState, useEffect } from "react";
import { withRouter, useHistory, useParams } from "react-router-dom";
import "./CreateEditTrip.css";
import {
  createTrip,
  clearTrip,
  fetchSingleTrip,
} from "../../../actions/tripActions";
import { useSelector, useDispatch } from "react-redux";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";

const CreateEditTrip = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm();
  const tripID = +useParams().id;
  const [isEdit, setIsEdit] = useState(false);
  const trip = useSelector((state) => state.tripReducer.trip);

  const submitForm = (values) => {
    const data = { ...values, tripImage: values.tripImage[0] };
    let form_data = new FormData();

    for (let key in data) {
      form_data.append(key, data[key]);
    }
    dispatch(createTrip(form_data, history));
  };

  useEffect(() => {
    if (tripID) {
      setIsEdit(true);
      dispatch(fetchSingleTrip(tripID));
    }
    return () => {
      dispatch(clearTrip());
    };
  }, [fetchSingleTrip, tripID]);

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
        <input
          className="user_input"
          type="text"
          placeholder="Destination"
          name="name"
          defaultValue={isEdit ? trip.location : ""}
          ref={register({ required: true })}
        />
        <textarea
          className="text_area"
          type="text"
          placeholder="Description"
          name="description"
          defaultValue={isEdit ? trip.description : ""}
          ref={register({ required: true })}
        />
        <div>
          <Controller
            control={control}
            name="ReactDatepickerstart"
            ref={register({ required: true })}
            render={({ onChange, onBlur, value }) => (
              <ReactDatePicker
                placeholderText="Date and time"
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
            name="ReactDatepickerend"
            ref={register({ required: true })}
            render={({ onChange, onBlur, value }) => (
              <ReactDatePicker
                placeholderText="Date and time"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            )}
          />
        </div>

        <input
          className="user_input"
          type="number"
          placeholder="Available space"
          name="space"
          defaultValue={isEdit ? trip.freespace : null}
          ref={register({ required: true })}
        />
        <input
          className="user_input"
          type="number"
          placeholder="Price per person"
          name="price"
          defaultValue={isEdit ? trip.price : null}
          ref={register({ required: true })}
        />
        <label for="file-upload" className="custom-file-upload">
          {isEdit ? (
            <span>Select new image if you want to replace old one</span>
          ) : (
            <span>Select image</span>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          name="tripImage"
          ref={register({ required: true })}
        />
        <button className="bookNow" type="submit">
          {!isEdit ? <span>Create</span> : <span>Edit</span>}
        </button>
      </form>
    </div>
  );
};

export default withRouter(CreateEditTrip);
