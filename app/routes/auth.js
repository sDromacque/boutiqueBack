const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');

const passport = require('passport');
const requireAuth  = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

router.post('/register', authCtrl.register);
router.post('/login', requireLogin, authCtrl.login);

module.exports = router;
