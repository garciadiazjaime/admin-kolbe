/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import compression from 'compression';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import flash from 'connect-flash';

import DataWrapper from './dataWrapper';
import config from '../config';
import routes from '../shared/config/routes';
import LogUtil from '../shared/utils/logUtil';
import UserController from './controllers/userController';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(compression());

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({ secret: config.get('secret') }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(express.static('static'));

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  console.log('email', email, 'password', password, 'done', done);
  const type = 'parent';
  UserController.login(email, password, type)
    .then((results) => {
      console.log('results', results.entity);
      if (results && results.entity && results.entity.status) {
        return done(null, results.entity.data);
      }
      return done(null, false, req.flash('loginMessage', 'Datos incorrrectos'));
    })
    .catch((error) => {
      console.log('error', error);
      return done(error);
    });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser((user, done) => {
  done(null, user);
  // UserController.get(user._id)
  //   .then((results) => {
  //     done(err, user);
  //   });
});

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  return res.redirect('/login');
}

app.get('/login', (req, res) => {
  res.render('login', { message: req.flash('loginMessage') });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: 'true',
}));

  // const user = 'user';
  // const password = 'password';
  // const type = 'profesor';
  // UserController.login(user, password, type)
  //   .then((results) => {
  //     console.log('results', results.entity);
  //     if (results && results.entity && results.entity.status) {
  //       res.redirect(200, '/');
  //     } else {
  //       res.redirect('/login', { message: req.flash('invalid login') });
  //     }
  //   })
  //   .catch((error) => {
  //     console.log('error', error);
  //     res.redirect('/login', { message: req.flash(error) });
  //   });
// });


app.get('/*', isLoggedIn, (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const props = {
        data: [],
      };
      const content = renderToString(<DataWrapper data={props}><RouterContext {...renderProps} /></DataWrapper>);
      res.render('index', { content, props });
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
