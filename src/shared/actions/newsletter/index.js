import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_NEWSLETTER = 'REQUEST_NEWSLETTER';
export const RECEIVE_NEWSLETTER = 'RECEIVE_NEWSLETTER';
export const SAVING_NEWSLETTER = 'SAVING_NEWSLETTER';
export const NEWSLETTER_SAVED = 'NEWSLETTER_SAVED';

function requestNewsletter() {
  return {
    type: REQUEST_NEWSLETTER,
  };
}

function receiveNewsletter(data) {
  return {
    type: RECEIVE_NEWSLETTER,
    newsletter: data.entity.data,
    receivedAt: Date.now(),
  };
}

function savingNewsletter() {
  return {
    type: SAVING_NEWSLETTER,
  };
}

function newsletterSaved(response) {
  return {
    type: NEWSLETTER_SAVED,
    receivedAt: Date.now(),
    didInvalidate: !!response.entity.error,
  };
}

function getNewsletterHelper(groupId, newsletterId) {
  return (dispatch) => {
    dispatch(requestNewsletter());
    return RequestUtil.get(`${constants.apiUrl}/group/${groupId}/newsletter/${newsletterId}`)
      .then(response => dispatch(receiveNewsletter(response)));
  };
}

function saveNewsletterHelper(groupId, data) {
  return (dispatch) => {
    dispatch(savingNewsletter());
    return RequestUtil.post(`${constants.apiUrl}/group/${groupId}/newsletter`, data)
      .then(response => dispatch(newsletterSaved(response)));
  };
}

function updateNewsletterHelper(groupId, newsletterId, data) {
  return (dispatch) => {
    dispatch(savingNewsletter());
    return RequestUtil.put(`${constants.apiUrl}/group/${groupId}/newsletter/${newsletterId}`, data)
      .then(response => dispatch(newsletterSaved(response)));
  };
}

function shouldProccessNewsletter(state) {
  const newsletter = state.newsletterHelper;
  return newsletter.isProcessing !== true;
}

export function getNewsletter(groupId, newsletterId) {
  return (dispatch, getState) => {
    if (shouldProccessNewsletter(getState())) {
      return dispatch(getNewsletterHelper(groupId, newsletterId));
    }
    return null;
  };
}

export function saveNewsletter(groupId, data) {
  return (dispatch, getState) => {
    if (shouldProccessNewsletter(getState())) {
      return dispatch(saveNewsletterHelper(groupId, data));
    }
    return null;
  };
}

export function updateNewsletter(groupId, newsletterId, data) {
  return (dispatch, getState) => {
    if (shouldProccessNewsletter(getState())) {
      return dispatch(updateNewsletterHelper(groupId, newsletterId, data));
    }
    return null;
  };
}
