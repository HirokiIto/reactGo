/**
 * Routes for express app
 */
import cors from 'cors';

import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const guestsController = controllers && controllers.guests;
const reservedGuestsController = controllers && controllers.reservedGuests;

const whitelist = ['http://localhost:8008', 'http://192.168.1.8:8008', 'http://192.168.1.12:8008']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export default (app) => {
  app.use(cors(corsOptions));

  // user routes
  if (usersController) {
    app.post('/sessions', usersController.login);
    app.post('/users', usersController.signUp);
    app.delete('/sessions', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  // guest routes
  if (guestsController) {
    app.get('/api/v1/guest/get', guestsController.all)
    app.post('/api/v1/guest/add', guestsController.add)
  }

  // reservedGuest routes
  if (reservedGuestsController) {
    app.get('/api/v1/guest/reserved_get', reservedGuestsController.all)
    app.post('/api/v1/guest/reserved_add', reservedGuestsController.add)
    app.post('/api/v1/guest/reserved_remove', reservedGuestsController.remove)
  }
};
