const convict = require('convict');

const config = convict({
  ipaddress: {
    doc: 'IP the application runs on',
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'NODEJS_IP',
  },
  port: {
    doc: 'Port the application listens on',
    format: 'port',
    default: '3030',
    env: 'NODEJS_PORT',
  },
  api: {
    url: {
      doc: 'API URL',
      format: String,
      default: 'http://127.0.0.1:3033/',
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
