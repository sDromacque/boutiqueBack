const file = require('../models/file');
const mongoose = require('mongoose');
const boom = require('boom');
const yauzl = require('yauzl');
const path = require('path');
const fs = require('fs');
const config = require('../../config/dev');

mongoose.Promise = require('bluebird');

module.exports = {
  findAll: (req, res) => {
    File.find()
      .then(files => {
        res.json(files);
      });
  },

  post: (req, res) => {

    // todo change to classic unzip
    yauzl.open(req.file.path, {lazyEntries: true}, function(err, zipfile) {
      if (err) throw err;
      zipfile.readEntry();

      zipfile.on("error", err => {
        throw err;
      });

      zipfile.on('entry', function (entry) {

      let fname = config.file.image + entry.fileName;

      zipfile.openReadStream(entry, function(err, readStream) {
        if (err) throw err;
        readStream.pipe(fs.createWriteStream(fname));
        readStream.on("end", function() {
          zipfile.readEntry();
        });
      });
      }).on('end',function() {
      //todo save file
      });
    });
  }

};
