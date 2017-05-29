import { SAVING_NEWSLETTER, NEWSLETTER_SAVED, REQUEST_NEWSLETTER, RECEIVE_NEWSLETTER } from '../../actions/newsletter';


function newsletter(state = {
  isProcessing: false,
  didInvalidate: false,
  data: {},
}, action) {
  switch (action.type) {
    case REQUEST_NEWSLETTER:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case RECEIVE_NEWSLETTER:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.newsletter,
      });
    case SAVING_NEWSLETTER:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
        lastUpdated: null,
      });
    case NEWSLETTER_SAVED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        groupId: action.groupId,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function newsletterHelper(state = { }, action) {
  switch (action.type) {
    case REQUEST_NEWSLETTER:
    case RECEIVE_NEWSLETTER:
    case SAVING_NEWSLETTER:
    case NEWSLETTER_SAVED:
      return newsletter(state.newsletter, action);
    default:
      return state;
  }
}
