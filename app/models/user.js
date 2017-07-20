const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  validator = require('validator'),
  bcrypt = require('bcrypt')
;

let UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: email => {
      return validator.isEmail(email);
    },
    unique: true
  },
  address: {
    zipCode: {
      type: Number,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    streetAddress: {
      type: String,
    }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'pro', 'admin'],
    default: 'customer'
  }
});

UserSchema.pre('save', function(next){

  let user = this;
  /* if the user's password has not been modified, do not continue with
  hashing their password....this is for updating a user. If a user does not
  update their password, do not create a new password hash! */
  if (!user.isModified('password')){
    return next();
  }

  // if the user has modified their password, let's hash it
  bcrypt.hash(user.password, 10).then(hashedPassword => {
    // then let's set their password to not be the plain text one anymore, but the newly hashed password
    user.password = hashedPassword;
    // then we save the user in the db!
    next();
  }, err => {
    // or we continue and pass in an error that has happened (which our express error handler will catch)
    return next(err);
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err){
      return cb(err);
    }

    cb(null, isMatch);
  });
};

let User = mongoose.model('User', UserSchema);

module.exports = User;
