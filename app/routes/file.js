const express = require('express');
const router = express.Router();
const fileCtrl = require('../controllers/fileCtrl');
const passport = require('passport');
const config = require('../../config/dev');

const multer  = require('multer')
var storage = multer.memoryStorage()

const upload = multer({ dest: config.file.uploads_zip })

const requireAuth  = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

router.get('/', fileCtrl.findAll);
router.post('/', upload.single('file'), fileCtrl.post);


module.exports = router;
