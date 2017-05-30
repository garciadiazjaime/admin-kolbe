import RequestUtil from '../../../shared/utils/requestUtil';
import config from '../../../config';

export default class UserController {

  static login(user, password, type) {
    const data = {
      user,
      password,
      type,
    };
    const apiUrl = config.get('api.url');
    return RequestUtil.post(`${apiUrl}api/login`, data);
  }
}
