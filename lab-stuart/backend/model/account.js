'use strict';

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const httpErrors = require('http-errors');

const accountSchema  = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
  tokenSeed: {type: String, required: true, unique: true},
  created: {type: Date, default: () => new Date()},
  googleOAuth: {type: Boolean, default: false},
})

accountSchema.methods.passwordVerify = function(password){
  return bcrypt.compare(password, this.passwordHash)
  .then(correctPassword => {
    if(!correctPassword)
      throw httpErrors(401, '::AUTH_ERROR:: incorrect password');
    return this;
  });
}

accountSchema.methods.tokenCreate = function(){
  this.tokenSeed = crypto.randomBytes(64).toString('hex');
  return this.save()
  .then(account => {
    let options = {expiresIn: '7d'};
    return jwt.sign({tokenSeed: account.tokenSeed}, process.env.LABSTUART_SECRET, options);
  });
}

const Account = module.exports = mongoose.model('account', accountSchema);

Account.create = function(data){
  data = {...data};
  let {password} = data;
  delete data.password;
  return bcrypt.hash(password, 8)
  .then(passwordHash => {
    data.passwordHash = passwordHash;
    data.tokenSeed = crypto.randomBytes(64).toString('hex');
    return new Account(data).save();
  });
}

Account.handleGoogleOAuth = function(openIDProfile){
  return Account.findOne({email: openIDProfile.email})
  .then(account => {
    if (account) {
      if(account.googleOAuth)
        return account;
      throw new Error('Account found but not connected to google.');
    }
    return new Account({
      username: openIDProfile.email.split('@')[0],
      email: openIDProfile.email,
      passwordHash: crypto.randomBytes(32).toString('hex'),
      tokenSeed: crypto.randomBytes(32).toString('hex'),
      googleOAuth: true,
    })
    .save();
  });
}
