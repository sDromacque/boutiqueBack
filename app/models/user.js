let mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema
;

const validator = require('validator');

let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    validate: email => {
      return validator.isEmail(email);
    }
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
