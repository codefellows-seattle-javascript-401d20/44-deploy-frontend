'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Account = require('../model/account.js');
const httpErrors = require('http-errors');
const superagent = require('superagent');
const basicAuth = require('../lib/basic-auth-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

module.exports = new Router()
  .get('/oauth/google', (req, res, next) => {
    console.log(req.query)
    // get gode if no code go back to fontend
    if(!req.query.code){
      res.redirect(process.env.CLIENT_URL);
    } else {
      //exchange code and client secret and clientID for a accessToken
      superagent.post('https://www.googleapis.com/oauth2/v4/token')
        .type('form')
        .send({
          code: req.query.code,
          grant_type: 'authorization_code',
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: `${process.env.API_URL}/oauth/google`,
        })
        .then((res) => {
          console.log(res.body);
          if(!res.body.access_token)
            throw new Error('no access token');
          return res.body.access_token;
        })
        .then(accessToken => {
          // exchange the access token for a profile
          return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
            .set('Authorization', `Bearer ${accessToken}`);
        })
        .then(res => {
          // find an account or create an account
          return Account.handleGoogleOAuth(res.body);
        })
        .then(account => account.tokenCreate())
        .then(token => {
          res.cookie('X-Labstuart-token', token);
          res.redirect(process.env.CLIENT_URL);
        })
        .catch(err => {
          console.error(err);
          res.cookie('X-Labstuart-token', '');
          res.redirect(process.env.CLIENT_URL + '?error=oauth');
        })
    }
  })
  .post('/signup', jsonParser, (req, res, next) => {
    if(!req.body.username || !req.body.email || !req.body.password)
      return next(httpErrors(400, '::REQUEST_ERROR:: username, email, and password are required'));
    Account.create(req.body)
      .then(user => user.tokenCreate())
      .then(token => {
        res.cookie('X-Labstuart-Token', token, {maxAge: 604800000});
        res.json({token});
      })
      .catch(next);
  })
  .get('/login', basicAuth, (req, res, next) => {
    if(!req.account)
      return next(httpErrors(401, '::REQUEST_ERROR:: account not found'));
    req.account.tokenCreate()
      .then(token => {
        res.cookie('X-Labstuart-Token', token, {maxAge: 604800000})
        res.json({token})
      })
      .catch(next);
  })
  .get('/profiles/me', bearerAuth, (req, res, next) => {
    res.json({
      username: req.account.username,
      email: req.account.email,
    })
  });
