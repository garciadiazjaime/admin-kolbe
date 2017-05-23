import { combineReducers } from 'redux';

import { schoolById, selectedSchool } from './school';
import { locationById, selectedLocation } from './location';
import { activityHelper } from './activity';
import { activitiesByGroup } from './activity/list';
import { documentHelper } from './document';
import { documentsByGroup } from './document/list';
import { newsletterHelper } from './newsletter';
import { newslettersByGroup } from './newsletter/list';
import { parentHelper, selectedParent } from './parent';
import { parentsByGroup } from './parent/list';
import { selectedGroup, groupUploadHelper } from './group';
import { studentHelper } from './student';
import { studentsByParent, studentsByGroup } from './student/list';

const rootReducer = combineReducers({
  schoolById,
  selectedSchool,
  locationById,
  selectedLocation,
  activityHelper,
  selectedGroup,
  groupUploadHelper,
  activitiesByGroup,
  documentHelper,
  documentsByGroup,
  newsletterHelper,
  newslettersByGroup,
  parentHelper,
  parentsByGroup,
  selectedParent,
  studentHelper,
  studentsByParent,
  studentsByGroup,
});

export default rootReducer;