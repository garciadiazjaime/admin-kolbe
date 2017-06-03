const convict = require('convict');

const config = convict({
  ipaddress: {
    doc: 'IP the application runs on',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'OPENSHIFT_NODEJS_IP',
  },
  port: {
    doc: 'Port the application listens on',
    format: 'port',
    default: '3030',
    env: 'OPENSHIFT_NODEJS_PORT',
  },
  api: {
    url: {
      doc: 'API URL',
      format: String,
      default: 'http://127.0.0.1:3000/',
      env: 'KOLBE_API_URL',
    },
  },
  secret: {
    doc: 'session secret',
    format: String,
    default: 'kolbe',
  },
});

config.validate();

module.exports = config;
