const User = require('../models/user');
const mongoose = require('mongoose');
const boom = require('boom');
const _ = require('lodash');
mongoose.Promise = require('bluebird');

module.exports = {
  /**
  * @api {get} /user/:id Request User information
  * @apiName GetUser
  * @apiGroup User
  *
  * @apiParam {Number} id Users unique ID.
  *
  * @apiSuccess {String} firstname Firstname of the User.
  * @apiSuccess {String} lastname  Lastname of the User.
  *
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 OK
  * {
  *   "firstname": "John",
  *   "lastname": "Doe"
  * }
  *
  * @apiError UserNotFound The id of the User was not found.
  *
  * @apiErrorExample Error-Response:
  * HTTP/1.1 404 Not Found
  * {
  *   "error": "UserNotFound"
  * }
  */
  findById: (req, res) => {
    User.findOne({
      _id: req.params.id
    })
    .then(user => {
      if (!user){
        res.json(boom.notFound('User not found'));
      }
      res.json(user);
    })
    .catch(() => {
      res.json(boom.badRequest());
    });
  },

  /**
  * @api {get} /user Request User information
  * @apiName GetUser
  * @apiGroup User
  *
  * @apiParam {Number} id Users unique ID.
  *
  * @apiSuccess {String} firstname Firstname of the User.
  * @apiSuccess {String} lastname  Lastname of the User.
  *
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 OK
  * [{
  *   "firstname": "John",
  *   "lastname": "Doe"
  * },{
  *   "firstname": "John",
  *   "lastname": "Doe"
  * }]
  *
  */
  findAll: (req, res) => {
    User.find()
    .then(users => {
      if (!users){
        return next(boom.notFound());
      }
      res.json(users);
    });
  },

  /**
  * @api {post} /user Request User information
  * @apiName PostUser
  * @apiGroup User
  *
  * @apiSuccess {String} firstname Firstname of the User.
  * @apiSuccess {String} lastname  Lastname of the User.
  *
  * @apiExample Body
  * {
  *   "name": "tom",
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
  post: (req, res) => {
    let user = new User(req.body);

    User.create(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      switch (err.name || err.kind) {
        case 'ValidationError':
          //Unique Conflict
          if (_.some(err.errors, {kind: 'Duplicate value'})) {
            return res.status(409).json({
              errors: _(err.errors)
              .filter({kind: 'Duplicate value'})
              .map('path')
              .value()
            });
          }

          return res.status(400).json({
            errors: _.map(err.errors, 'path')
          });
        default:
          return next(err);
      }
    });
  },

  /**
  * @api {put} /user/:id Request User information
  * @apiName PutUser
  * @apiGroup User
  *
  * @apiParam {Number} id Users unique ID.
  *
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 OK
  * {
  *   "firstname": "John",
  *   "lastname": "Doe"
  * }
  *
  * @apiError UserNotFound The id of the User was not found.
  *
  * @apiErrorExample Error-Response:
  * HTTP/1.1 404 Not Found
  * {
  *   "error": "UserNotFound"
  * }
  */
  update: (req, res, next) => {
    User.findOneAndUpdate({
      _id: req.params.id},
      req.body
    )
    .then(result =>  {
      if (!result) {
        throw boom.notFound();
      }

      res.json(result);
    })
    .catch(next);
  }
};
