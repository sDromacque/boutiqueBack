const Boutique = require('../models/boutique');
const mongoose = require('mongoose');
const boom = require('boom');
mongoose.Promise = require('bluebird');

module.exports = {
  /**
  * @api {get} /boutique/:id Request Boutique information
  * @apiName GetBoutique
  * @apiGroup Boutique
  *
  * @apiParam {Number} id Boutiques unique ID.
  *
  * @apiSuccess {String} firstname Firstname of the Boutique.
  * @apiSuccess {String} lastname  Lastname of the Boutique.
  *
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 OK
  * {
  *   "firstname": "John",
  *   "lastname": "Doe"
  * }
  *
  * @apiError BoutiqueNotFound The id of the Boutique was not found.
  *
  * @apiErrorExample Error-Response:
  * HTTP/1.1 404 Not Found
  * {
  *   "error": "BoutiqueNotFound"
  * }
  */
  findById: (req, res) => {
    Boutique.findOne({
      _id: req.params.id
    })
      .then(boutique => {
        if (!boutique){
          res.json(boom.notFound('User not found'));
        }
        res.json(boutique);
      })
      .catch(() => {
        res.json(boom.badRequest());
      });
  },

  findAll: (req, res) => {
    Boutique.find()
      .then(boutiques => {
        res.json(boutiques);
      });
  }
};
