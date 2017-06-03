import compression from 'compression';
import express from 'express';
import { match } from 'react-router';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import config from '../config';
import routes from '../shared/config/routes';
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
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.render('index');
    } else {
      res.status(404).send('Not found');
    }
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
