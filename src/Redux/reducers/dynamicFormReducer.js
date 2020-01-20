import * as types from '../actionTypes/dynamicFormActionType';

const dynamicFormReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.SEND_MULTIPLE_DATA_SUCCESS:
      return {...state, success: payload.message};
    case types.SEND_MULTIPLE_DATA_ERROR:
      return {...state, error: payload.message};
    default:
      return state
  };
};

export default dynamicFormReducer;
