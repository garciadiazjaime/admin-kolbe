import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_NEWSLETTERS = 'REQUEST_NEWSLETTERS';
export const RECEIVE_NEWSLETTERS = 'RECEIVE_NEWSLETTERS';


function requestNewsletters(groupId) {
  return {
    type: REQUEST_NEWSLETTERS,
    groupId,
  };
}

function receiveNewsletters(groupId, data) {
  return {
    type: RECEIVE_NEWSLETTERS,
    groupId,
    newsletters: data.entity.data,
    receivedAt: Date.now(),
  };
}

function getNewslettersHelper(groupId) {
  return (dispatch) => {
    dispatch(requestNewsletters(groupId));
    return RequestUtil.get(`${constants.apiUrl}/group/${groupId}/newsletter`)
      .then(response => dispatch(receiveNewsletters(groupId, response)));
  };
}

function shouldFetchNewsletters(state, groupId) {
  const newsletters = state.newslettersByGroup[groupId] || {};
  return newsletters.isFetching !== true;
}

export function getNewsletters(groupId) {
  return (dispatch, getState) => {
    if (shouldFetchNewsletters(getState(), groupId)) {
      return dispatch(getNewslettersHelper(groupId));
    }
    return null;
  };
}
