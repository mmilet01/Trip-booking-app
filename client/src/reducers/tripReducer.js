import {
  TRIPS_FETCHED_SUCCESSFULLY,
  SINGLE_TRIP_FETCHED_SUCCESSFULLY,
  TRIP_DELETED_SUCCESSFULLY,
  TRIP_EDITED_SUCCESSFULLY,
  CLEAR_TRIP,
  COMMENT_POSTED_SUCCESSFULLY,
  LIKE_ADDED_SUCCESSFULLY,
  REMOVED_LIKE_SUCCESSFULLY,
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
    case TRIP_DELETED_SUCCESSFULLY:
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      };
    case TRIP_EDITED_SUCCESSFULLY:
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
    case COMMENT_POSTED_SUCCESSFULLY:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case REMOVED_LIKE_SUCCESSFULLY:
    case LIKE_ADDED_SUCCESSFULLY:
      return {
        ...state,
        trips: action.payload,
      };
    default:
      return state;
  }
}
