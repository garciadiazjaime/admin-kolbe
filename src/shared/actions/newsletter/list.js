import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_NEWSLETTERS = 'REQUEST_NEWSLETTERS';
export const RECEIVE_NEWSLETTERS = 'RECEIVE_NEWSLETTERS';
export const DELETING_NEWSLETTER = 'DELETING_NEWSLETTER';
export const NEWSLETTER_DELETED = 'NEWSLETTER_DELETED';

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
    newsletters: data.entity.data || [],
    receivedAt: Date.now(),
  };
}

function deletingNewsletter(groupId) {
  return {
    type: DELETING_NEWSLETTER,
    groupId,
  };
}

function newsletterDeleted(groupId, entityId) {
  return {
    type: NEWSLETTER_DELETED,
    receivedAt: Date.now(),
    groupId,
    entityId,
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
  return newsletters.isProcessing !== true;
}

export function getNewsletters(groupId) {
  return (dispatch, getState) => {
    if (shouldFetchNewsletters(getState(), groupId)) {
      return dispatch(getNewslettersHelper(groupId));
    }
    return null;
  };
}

function deleteNewsletterHelper(groupId, newsletterId) {
  return (dispatch) => {
    dispatch(deletingNewsletter(groupId));
    return RequestUtil.delete(`${constants.apiUrl}/group/${groupId}/newsletter/${newsletterId}`)
      .then(() => dispatch(newsletterDeleted(groupId, newsletterId)));
  };
}

export function deleteNewsletter(groupId, newsletterId) {
  return (dispatch, getState) => {
    if (shouldFetchNewsletters(getState(), groupId)) {
      return dispatch(deleteNewsletterHelper(groupId, newsletterId));
    }
    return null;
  };
}
