import { combineReducers } from 'redux';

import { locationsBySchool, selectedSchool, locationById, selectedLocation } from './location';

const rootReducer = combineReducers({
  locationsBySchool,
  selectedSchool,
  locationById,
  selectedLocation,
});

export default rootReducer;
