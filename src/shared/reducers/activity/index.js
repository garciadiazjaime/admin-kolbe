import { SAVING_ACTIVITY, ACTIVITY_SAVED } from '../../actions/activity';


function activity(state = {
  isSaving: false,
  didInvalidate: false,
  data: {},
}, action) {
  switch (action.type) {
    case SAVING_ACTIVITY:
      return Object.assign({}, state, {
        isSaving: true,
        didInvalidate: false,
      });
    case ACTIVITY_SAVED:
      return Object.assign({}, state, {
        isSaving: false,
        didInvalidate: false,
        data: action,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function activityHelper(state = { }, action) {
  switch (action.type) {
    case SAVING_ACTIVITY:
    case ACTIVITY_SAVED:
      return activity(state.activity, action);
    default:
      return state;
  }
}
