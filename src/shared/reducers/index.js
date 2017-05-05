import { combineReducers } from 'redux';

import { schoolById, selectedSchool } from './school';
import { locationById, selectedLocation } from './location';
import { activityHelper } from './activity';
import { activitiesByGroup } from './activity/list';
import { selectedGroup } from './group';

const rootReducer = combineReducers({
  schoolById,
  selectedSchool,
  locationById,
  selectedLocation,
  activityHelper,
  selectedGroup,
  activitiesByGroup,
});

export default rootReducer;
