import { combineReducers } from 'redux';
import dynamicFormAction from './dynamicFormReducer';
import fetchCitiesReducer from './fetchCitiesReducer';

import { initialStates } from '../store/initialStates';


const allReducers = combineReducers({
  initialStates,
  dynamicFormAction,
  fetchCitiesReducer
});

export default allReducers;
