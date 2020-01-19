import * as type from '../actionTypes/fetchCitiesActionType';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const { REACT_APP_BASE_URL } = process.env;
const Option = {
  headers: {
    token: localStorage.getItem('token'),
  } 
};

const fetchCityResult = (type, data) => {
  return {
    type: type,
    payload: data,
  }
};

const fetchCities = () => async (dispatch) => {
  try {
    const getData = await axios.get(`${REACT_APP_BASE_URL}/location`, Option );
    return dispatch(fetchCityResult(type.Fetch_ALL_CITIES_SUCCESS, getData.data.data));
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;
      return dispatch(fetchCityResult(type.Fetch_ALL_CITIES_ERROR, { message }));
    }
    if (error.request) {
      return dispatch(fetchCityResult(type.Fetch_ALL_CITIES_ERROR, { message: ['Network Error'] }));
    }
    return dispatch(fetchCityResult(type.Fetch_ALL_CITIES_ERROR, { message: ['Server Error'] }));
  } 
}
export default fetchCities;
