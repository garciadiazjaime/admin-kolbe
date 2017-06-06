import StoreUtil from '../storeUtil';

export default class AuthUtil {

  static isLoggedIn() {
    console.log('isLoggedIn', !!StoreUtil.get('token'));
    return !!StoreUtil.get('token');
  }

}
