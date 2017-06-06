import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';
import _ from 'lodash';

import StoreUtil from '../storeUtil';

const client = rest
  .wrap(mime, { mime: 'application/json' })
  .wrap(errorCode, { code: 300 });

const submitClient = rest
  .wrap(mime, { mime: 'multipart/form-data' })
  .wrap(errorCode, { code: 300 });

function getConfig(config) {
  const token = StoreUtil.get('token');
  if (token) {
    return _.assign({}, config, {
      headers: {
        'x-access-token': token,
      },
    });
  }
  return config;
}

export default class RequestUtil {

  static get(url) {
    const config = { path: url };
    return client(getConfig(config));
  }

  /*
    Request method post
    @param {string} string
    @param {data} data
    @returns {object}
  */
  static post(url, data) {
    const config = {
      method: 'POST',
      path: url,
      entity: data,
    };
    return client(getConfig(config));
  }

  static submit(url, data, method) {
    const config = {
      method: method || 'POST',
      path: url,
      entity: data,
    };
    return submitClient(getConfig(config));
  }

  static put(url, data) {
    const config = {
      method: 'PUT',
      path: url,
      entity: data,
    };
    return client(getConfig(config));
  }

  static delete(url) {
    const config = {
      method: 'DELETE',
      path: url,
    };
    return client(getConfig(config));
  }
}
