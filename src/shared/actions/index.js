import fetch from 'isomorphic-fetch';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';
export const SELECT_SCHOOL = 'SELECT_SCHOOL';
export const INVALIDATE_SCHOOL = 'INVALIDATE_SCHOOL';

export function selectSchool(school) {
  return {
    type: SELECT_SCHOOL,
    school,
  };
}

export function invalidateSchool(school) {
  return {
    type: INVALIDATE_SCHOOL,
    school,
  };
}


function requestLocations(school) {
  return {
    type: REQUEST_LOCATIONS,
    school,
  };
}

function receiveLocations(school, json) {
  return {
    type: RECEIVE_LOCATIONS,
    school,
    locations: json.data.map(child => child),
    receivedAt: Date.now(),
  };
}

function fetchLocations(school) {
  return (dispatch) => {
    dispatch(requestLocations(school));
    return fetch('http://127.0.0.1:3000/api/location')
      .then(response => response.json())
      .then(json => dispatch(receiveLocations(school, json)));
  };
}

function shouldFetchPosts(state, school) {
  const locations = state.locationsBySchool[school];
  if (!locations) {
    return true;
  } else if (locations.isFetching) {
    return false;
  }
  return locations.didInvalidate;
}

export function fetchLocationsIfNeeded(school) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), school)) {
      return dispatch(fetchLocations(school));
    }
    return null;
  };
}
