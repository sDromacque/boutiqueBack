let mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema
;
const bcrypt   = require('bcrypt');

const validator = require('validator');

let UserSchema = new Schema({
  // firstName: {
  //   type: String,
  //   required: true
  // },
  // username: {
  //   type: String,
  //   required: true
  // },
  // lastName: {
  //   type: String,
  //   required: true
  // },
  email: {
    type: String,
    required: true,
    validate: email => {
      return validator.isEmail(email);
    },
    unique: true
  },
  // address:{
  //   zipCode: {
  //     type: Number,
  //     required: true
  //   },
  //   city: {
  //     type: String,
  //     required: true
  //   },
  //   country: {
  //     type: String,
  //     required: true
  //   },
  //   streetAddress: {
  //     type: String,
  //     required: true
  //   }
  // },

  password: {
      type: String,
      required: true
  },
  role: {
      type: String,
      enum: ['reader', 'creator', 'editor'],
      default: 'reader'
  }
});


UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

let User = mongoose.model('User', UserSchema);

module.exports = User;
