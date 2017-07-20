const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const passport = require('passport');

const requireAuth  = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

router.get('/', requireAuth, userCtrl.findAll);
router.get('/:id', userCtrl.findById);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.delete);

module.exports = router;
