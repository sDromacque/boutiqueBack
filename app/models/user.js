let mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema
;

let UserSchema = new Schema({
  name: String,
  username: String,
  lastname: String,
  email: String
});

let User = mongoose.model('User', UserSchema);

module.exports = User;