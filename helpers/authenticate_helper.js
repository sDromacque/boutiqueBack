const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const config = require('../config/main');

module.exports = {
  setUserInfo: request => {
    return new Promise(resolve => {
      resolve({
        _id: request._id,
        email: request.email,
        role: request.role
      })
    });
  },

  generateToken: user => {
    return new Promise(resolve => {
      resolve(jwt.sign(user, config.secret, {
        expiresIn: 604800 // in seconds
      }))
    });
  }
};
