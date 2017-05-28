import { REQUEST_STUDENTS_BY_PARENT,
  RECEIVE_STUDENTS_BY_PARENT,
  REQUEST_STUDENTS_BY_GROUP,
  RECEIVE_STUDENTS_BY_GROUP } from '../../actions/student/list';

function student(state = {
  isFetching: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_STUDENTS_BY_PARENT:
    case REQUEST_STUDENTS_BY_GROUP:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_STUDENTS_BY_PARENT:
    case RECEIVE_STUDENTS_BY_GROUP:
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

export function studentsByParent(state = { }, action) {
  switch (action.type) {
    case REQUEST_STUDENTS_BY_PARENT:
    case RECEIVE_STUDENTS_BY_PARENT:
      return Object.assign({}, state, {
        [action.parentId]: student(state[action.parentId], action),
      });
    default:
      return state;
  }
}

export function studentsByGroup(state = { }, action) {
  switch (action.type) {
    case REQUEST_STUDENTS_BY_GROUP:
    case RECEIVE_STUDENTS_BY_GROUP:
      return Object.assign({}, state, {
        [action.groupId]: student(state[action.groupId], action),
      });
    default:
      return state;
  }
}
