import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import config from '../config';
import LogUtil from '../shared/utils/logUtil';

const app = express();

app.use(morgan('dev'));
app.use(compression());

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(express.static('static'));

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.get('/*', (req, res) => {
  res.render('index', {
    apiUrl: config.get('api.url'),
  });
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));

const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
  if (err) {
    LogUtil.log(`server listen error: ${err}`);
  }

  const host = server.address().address;
  const port = server.address().port;
  LogUtil.log(`App listening at http://${host}:${port}`);
});
