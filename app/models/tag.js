let mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema
  ;

let TagSchema = new Schema({
  name: {
    type: String
  },

});

let Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
