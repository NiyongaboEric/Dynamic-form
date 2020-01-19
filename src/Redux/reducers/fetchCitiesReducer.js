import * as types from '../actionTypes/fetchCitiesActionType';

const fetchCitiesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.Fetch_ALL_CITIES_SUCCESS:
      return {...state, payload};
    case types.Fetch_ALL_CITIES_ERROR:
      return payload;
    default:
      return state
  };
};

export default fetchCitiesReducer;
