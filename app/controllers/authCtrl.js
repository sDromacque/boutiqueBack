const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authConfig = require('../../config/auth');

function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}

function setUserInfo(request){
    console.log(request)
    return {
        _id: request._id,
        email: request.email,
        role: request.role
    };
}

module.exports = {
  register: (req, res, next) => {
      var email = req.body.email;
      var password = req.body.password;
      var role = req.body.role;

      if(!email){
          return res.status(422).send({error: 'You must enter an email address'});
      }

      if(!password){
          return res.status(422).send({error: 'You must enter a password'});
      }

      User.findOne({email: email}, function(err, existingUser){

          if(err){
              return next(err);
          }

          if(existingUser){
              return res.status(422).send({error: 'That email address is already in use'});
          }

          var user = new User({
              email: email,
              password: password,
              role: role
          });

          user.save(function(err, user){
              if(err){
                  return next(err);
              }

              var userInfo = setUserInfo(user);

              res.status(201).json({
                  token: 'JWT ' + generateToken(userInfo),
                  user: userInfo
              })

          });

      });
  },

  login: (req, res, next) => {
      var userInfo = setUserInfo(req.body);
      res.status(200).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
      });
  }
};
