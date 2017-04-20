import { combineReducers } from 'redux';

import { schoolById, selectedSchool } from './school';
// import { locationsBySchool } from './location/list';
// locationsBySchool,
import { locationById, selectedLocation } from './location';

const rootReducer = combineReducers({
  schoolById,
  selectedSchool,
  locationById,
  selectedLocation,
});

export default rootReducer;
