import fetch from 'isomorphic-fetch';

export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const SELECT_LOCATION = 'SELECT_LOCATION';
export const INVALIDATE_LOCATION = 'INVALIDATE_LOCATION';

export function selectLocation(locationId) {
  return {
    type: SELECT_LOCATION,
    locationId,
  };
}

export function invalidateLocation(locationId) {
  return {
    type: INVALIDATE_LOCATION,
    locationId,
  };
}

function requestLocation(locationId) {
  return {
    type: REQUEST_LOCATION,
    locationId,
  };
}

function receiveLocation(locationId, json) {
  return {
    type: RECEIVE_LOCATION,
    locationId,
    location: json.data,
    receivedAt: Date.now(),
  };
}

function fetchLocation(locationId) {
  return (dispatch) => {
    dispatch(requestLocation(locationId));
    return fetch('http://127.0.0.1:3000/api/school/58f3b39a3b44ad5880370db6')
      .then(response => response.json())
      .then(json => dispatch(receiveLocation(locationId, json)));
  };
}

function shouldFetchLocation(state, locationId) {
  const location = state.locationById[locationId];
  if (!location) {
    return true;
  } else if (location.isFetching) {
    return false;
  }
  return location.didInvalidate;
}

export function fetchLocationIfNeeded(locationId) {
  return (dispatch, getState) => {
    if (shouldFetchLocation(getState(), locationId)) {
      return dispatch(fetchLocation(locationId));
    }
    return null;
  };
}
