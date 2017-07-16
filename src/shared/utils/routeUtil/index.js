import _ from 'lodash';
import StoreUtil from '../storeUtil';
import constants from '../../../constants';

export const TEST = 'TEST';

// After login this functions helps to get user base route
// @param {object} user - User passed from api
// @return {string}
export function getUserRoute(user) {
  if (!_.isEmpty(user) && user.id) {
    StoreUtil.set('token', user.token);
    return constants.roleRoute[user.role] || null;
  }
  return null;
}
