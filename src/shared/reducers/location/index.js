import _ from 'lodash';

import { SELECT_LOCATION } from '../../actions/location';
import { RECEIVE_SCHOOL } from '../../actions/school';

export function selectedLocation(state = '', action) {
  switch (action.type) {
    case SELECT_LOCATION:
      return action.locationId;
    default:
      return state;
  }
}

function setLocationsById(data) {
  const locations = {};
  if (data && _.isArray(data.location) && data.location.length) {
    data.location.map((item) => {
      locations[item.id] = item;
      return null;
    });
  }
  return locations;
}

export function locationById(state = { }, action) {
  switch (action.type) {
    case RECEIVE_SCHOOL:
      return setLocationsById(action.school);
    default:
      return state;
  }
}
