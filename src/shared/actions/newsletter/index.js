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

function newsletterSaved(groupId) {
  return {
    type: NEWSLETTER_SAVED,
    receivedAt: Date.now(),
    groupId,
  };
}

function getNewsletterHelper(newsletterId) {
  return (dispatch) => {
    dispatch(requestNewsletter());
    return RequestUtil.get(`${constants.apiUrl}/newsletter/${newsletterId}`)
      .then(response => dispatch(receiveNewsletter(response)));
  };
}

function saveNewsletterHelper(groupId, data) {
  return (dispatch) => {
    dispatch(savingNewsletter());
    return RequestUtil.post(`${constants.apiUrl}/group/${groupId}/newsletter`, data)
      .then(() => dispatch(newsletterSaved(groupId)));
  };
}

function updateNewsletterHelper(newsletterId, data) {
  return (dispatch) => {
    dispatch(savingNewsletter());
    return RequestUtil.put(`${constants.apiUrl}/newsletter/${newsletterId}`, data)
      .then(() => dispatch(newsletterSaved(data.groupId)));
  };
}

function shouldProccessNewsletter(state) {
  const newsletter = state.newsletterHelper;
  return newsletter.isProcessing !== true;
}

export function getNewsletter(newsletterId) {
  return (dispatch, getState) => {
    if (shouldProccessNewsletter(getState())) {
      return dispatch(getNewsletterHelper(newsletterId));
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

export function updateNewsletter(newsletterId, data) {
  return (dispatch, getState) => {
    if (shouldProccessNewsletter(getState())) {
      return dispatch(updateNewsletterHelper(newsletterId, data));
    }
    return null;
  };
}
