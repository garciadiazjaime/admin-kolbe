import { REQUEST_STUDENTS, RECEIVE_STUDENTS } from '../../actions/student/list';

function student(state = {
  isFetching: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_STUDENTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_STUDENTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.students,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function studentsByEntity(state = { }, action) {
  switch (action.type) {
    case REQUEST_STUDENTS:
    case RECEIVE_STUDENTS:
      return Object.assign({}, state, {
        [action.entityId]: student(state[action.entityId], action),
      });
    default:
      return state;
  }
}
