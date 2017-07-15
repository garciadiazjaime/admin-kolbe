import StoreUtil from '../storeUtil';
import RequestUtil from '../requestUtil';
import constants from '../../../constants';

export default class AuthUtil {

  static isLoggedIn() {
    return !!StoreUtil.get('token');
  }

  static isTokenValid() {
    return new Promise((resolve, reject) => {
      const token = StoreUtil.get('token');
      if (token) {
        RequestUtil.get(`${constants.apiUrl}/session`)
          .then((results) => {
            if (results.entity.status) {
              resolve(results.entity);
            } else {
              reject('invalid token');
            }
          })
          .catch(response => reject(response.error));
      } else {
        reject('invalid token');
      }
    });
  }

}
