export const PERMISSIONS = {
  groupSettings: 'group_settings',
};

const ROLES = {
  level: 1,
  group: 2,
  parent: 3,
  location: 4,
  school: 5,
};

export function hasUserPermission(action = '', role) {
  switch (action.toLowerCase()) {
    case PERMISSIONS.groupSettings:
      if (role === ROLES.level || role === ROLES.school) {
        return true;
      }
      break;
    default:
      return false;
  }
  return false;
}
