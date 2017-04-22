export const SELECT_LOCATION = 'SELECT_LOCATION';

export function selectLocation(locationId) {
  return {
    type: SELECT_LOCATION,
    locationId,
  };
}

export function setLocation(schoolId, locationId) {
  return (dispatch, getState) => {
    const state = getState();
    const school = state.schoolById[schoolId] ? state.schoolById[schoolId].data : {};
    if (school.location && school.location.length) {
      return school.location[locationId];
    }
    return null;
  };
}
