import { combineReducers } from 'redux';

import { schoolById, selectedSchool } from './school';
import { locationById, selectedLocation } from './location';
import { activityHelper } from './activity';
import { activitiesByGroup } from './activity/list';
import { documentHelper } from './document';
import { documentsByGroup } from './document/list';
import { newsletterHelper } from './newsletter';
import { newslettersByGroup } from './newsletter/list';
import { selectedGroup } from './group';

const rootReducer = combineReducers({
  schoolById,
  selectedSchool,
  locationById,
  selectedLocation,
  activityHelper,
  selectedGroup,
  activitiesByGroup,
  documentHelper,
  documentsByGroup,
  newsletterHelper,
  newslettersByGroup,
});

export default rootReducer;
