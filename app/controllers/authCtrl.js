const User = require('../models/user');
const setUserInfo = require('../../helpers/authenticate_helper').setUserInfo;
const generateToken = require('../../helpers/authenticate_helper').generateToken;
const Promise = require('bluebird');
const _ = require('lodash');
const config = require('../../config/dev');

const mailgun = require('mailgun-js')({
  apiKey: config.mailgun_priv_key,
  domain: config.mailgun_domain
});

module.exports = {
  /**
  * @api {post} /register Post a new user
  * @apiName PostUser
  * @apiGroup Auth
  *
  * @apiSuccess {String} email Email of the User.
  *
  * @apiExample Body
  * {
  *   "password": "azerty123",
  *   "email": "tom@gmail.com"
  * }
  *
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 OK
  * {
  *   "firstname": "John",
  *   "lastname": "Doe"
  * }
  *
  */
  register: (req, res) => {
    let user = new User(req.body);

    User.create(user)
      .then(user => {
        return Promise.all([
          setUserInfo(user)
        ])
          .spread(userInfo => {
            return Promise.all([
              userInfo,
              generateToken(user)
            ]);
          })
          .spread((userInfo, token) => {
            let data = {
              from: 'Excited User <me@samples.mailgun.org>',
              to: userInfo.email,
              subject: 'Welcome to website',
              text: 'Testing some Mailgun awesomness!'
            };

            mailgun.messages().send(data, (error, body) => {
              console.log(body);
            });

            res.status(201).json({
              token: 'JWT ' + token,
              user: userInfo
            });
          });
      })
      .catch(err => {
        switch (err.name || err.kind) {
          case 'MongoError':
            //Unique Conflict
            if (err.code === 11000) {
              return res.status(409).json({
                errors: _(err.message)
                  .value()
              });
            }
          default:
            return res.status(400).json({
              errors: _.map(err.errors, 'path')
            });
        }
      });
  },

  login: (req, res) => {
    let user = new User(req.body);

    return new Promise(resolve => {
      resolve(generateToken(user));
    })
      .then(token => {
        res.status(201).json({
          token: 'JWT ' + token
        });
      });
  }
};
