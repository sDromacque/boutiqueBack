let mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema
  ;

let FileSchema = new Schema({
  name: {
    type: String
  },
  purpose: {
    type: String,
    enum: ['basic', 'first'],
    default: 'basic'
  }

});

let File = mongoose.model('File', FileSchema);

module.exports = File;
