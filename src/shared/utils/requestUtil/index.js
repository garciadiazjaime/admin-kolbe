import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';

const client = rest
  .wrap(mime, { mime: 'application/json' })
  .wrap(errorCode, { code: 300 });

const submitClient = rest
  .wrap(mime, { mime: 'multipart/form-data' })
  .wrap(errorCode, { code: 300 });

export default class RequestUtil {

  static get(url) {
    return client({ path: url });
  }

  /*
    Request method post
    @param {string} string
    @param {data} data
    @returns {object}
  */
  static post(url, data) {
    return client({
      method: 'POST',
      path: url,
      entity: data,
    });
  }

  static submit(url, data) {
    return submitClient({
      method: 'POST',
      path: url,
      entity: data,
    });
  }

  static put(url, data) {
    return client({
      method: 'PUT',
      path: url,
      entity: data,
    });
  }

  static delete(url) {
    return client({
      method: 'DELETE',
      path: url,
    });
  }
}
