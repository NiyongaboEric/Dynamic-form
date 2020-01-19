import * as type from '../actionTypes/dynamicFormActionType';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { REACT_APP_BASE_URL } = process.env;

export const requestResult = (type, data) => {
  return {
    type: type,
    payload: data,
  }
};

const dynamicFormAction = (data) => async (dispatch) => {
  const Option = {
    headers: {
      token: localStorage.getItem('token'),
    } 
  };

  data.forEach((item, index) => {
    data[index].originId = parseInt(item.originId);
    data[index].destinationId = parseInt(item.destinationId);
  });

  const multipleDataCombined = {
    itinerary: data
  };

  try {
    const createNewTrip = await axios.post(`${REACT_APP_BASE_URL}/trips/multicity`, multipleDataCombined , Option);
    const { message } = createNewTrip.data;
    return dispatch(requestResult(type.SEND_MULTIPLE_DATA_SUCCESS, {message}));
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;
      return dispatch(requestResult(type.SEND_MULTIPLE_DATA_ERROR, { message }));
    }
    if (error.request) {
      return dispatch(requestResult(type.SEND_MULTIPLE_DATA_ERROR, { message: ['Network Error'] }));
    }
    return dispatch(requestResult(type.SEND_MULTIPLE_DATA_ERROR, { message: ['Server Error'] }));
  }
}

export default dynamicFormAction;
