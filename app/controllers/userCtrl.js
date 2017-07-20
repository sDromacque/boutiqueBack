const User = require('../models/user');
const mongoose = require('mongoose');
const boom = require('boom');
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
        res.json(users);
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
        _id: req.params.id
      },
      req.body
    )
    .then(result =>  {
      if (!result) {
        res.json(boom.notFound('User not found'));
      }

      res.status(204).json(result);
    })
    .catch(next);
  },

  delete: (req, res, next) => {
    User.findOneAndRemove({_id: req.params.id})
      .then(result => {
        if (!result) {
          res.json(boom.notFound('User not found'));
        }
        res.status(200).json(result);
      })
      .catch(next);
  }
};
