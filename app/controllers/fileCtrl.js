const File = require('../models/file');
const Boutique = require('../models/boutique');
const mongoose = require('mongoose');
const config = require('../../config/dev');
const decompress = require('decompress');
const moment = require('moment');
mongoose.Promise = require('bluebird');


module.exports = {
  findAll: (req, res) => {
    File.find()
      .then(files => {
        res.json(files);
      });
  },

  post: (req, res) => {
    let pathStorage = config.file.image + '/' + moment().unix();

    /**
    * param 1: path archive
    * param 2: path storage
    */
    decompress(req.file.path, pathStorage, {
      map: file => {
        file.path = file.path;
        return file;
      }
    })
    .then(files => {
      Boutique.update({

      });
    });
  }
};
