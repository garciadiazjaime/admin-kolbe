import StoreUtil from '../storeUtil';

export default class AuthUtil {

  static isLoggedIn() {
    return !!StoreUtil.get('token');
  }

}
