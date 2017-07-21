let mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema
  ;

let FileSchema = new Schema({
  name: {
    type: String
  },

});

let File = mongoose.model('File', FileSchema);

module.exports = File;
