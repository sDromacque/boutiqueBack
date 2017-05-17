let mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema
;

const validator = require('validator');

let UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: email => {
      return validator.isEmail(email);
    },
    unique: true
  },
  address:{
    zipCode: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    streetAddress: {
      type: String,
      required: true
    }
  },
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
