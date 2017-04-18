import { combineReducers } from 'redux';

import { schoolById, selectedSchool } from './school';
import { locationsBySchool } from './location/list';
import { locationById, selectedLocation } from './location';

const rootReducer = combineReducers({
  schoolById,
  selectedSchool,
  locationsBySchool,
  locationById,
  selectedLocation,
});

export default rootReducer;
