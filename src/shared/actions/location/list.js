import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';


function requestLocations(school) {
  return {
    type: REQUEST_LOCATIONS,
    school,
  };
}

function receiveLocations(school, data) {
  return {
    type: RECEIVE_LOCATIONS,
    school,
    locations: data.entity.data,
    receivedAt: Date.now(),
  };
}

function fetchLocations(school) {
  return (dispatch) => {
    dispatch(requestLocations(school));
    return RequestUtil.get(`${constants.apiUrl}/location`)
      .then(response => dispatch(receiveLocations(school, response)));
  };
}

function shouldFetchLocations(state, school) {
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
    if (shouldFetchLocations(getState(), school)) {
      return dispatch(fetchLocations(school));
    }
    return null;
  };
}
