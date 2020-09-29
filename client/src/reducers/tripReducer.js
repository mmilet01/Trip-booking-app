import {
  TRIPS_FETCHED_SUCCESSFULLY,
  SINGLE_TRIP_FETCHED_SUCCESSFULLY,
  DELETE_TRIP,
  EDIT_TRIP,
  CLEAR_TRIP,
  ADD_COMMENT,
  ADD_LIKE,
  REMOVE_LIKE,
  FETCHING_USER_TRIPS_SUCCESSFULLY,
} from "../constants/actions";

const initialState = {
  trips: [],
  trip: {},
  comments: [],
  user_trips: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRIPS_FETCHED_SUCCESSFULLY:
      return {
        ...state,
        trips: action.payload,
      };
    case FETCHING_USER_TRIPS_SUCCESSFULLY:
      return {
        ...state,
        user_trips: action.payload,
      };
    case SINGLE_TRIP_FETCHED_SUCCESSFULLY:
      return {
        ...state,
        trip: action.payload,
        comments: action.payload.comments,
      };
    case DELETE_TRIP:
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      };
    case EDIT_TRIP:
      return {
        ...state,
        trip: action.payload,
      };
    case CLEAR_TRIP:
      return {
        ...state,
        trip: {},
        comments: [],
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case ADD_LIKE:
      return {
        ...state,
        trips: action.payload,
      };
    case REMOVE_LIKE:
      return {
        ...state,
        trips: action.payload,
      };
    default:
      return state;
  }
}
