const express = require('express');
const router = express.Router();
const fileCtrl = require('../controllers/fileCtrl');
const config = require('../../config/dev');

const multer  = require('multer');

const upload = multer({dest: config.file.uploads_zip});

router.get('/', fileCtrl.findAll);
router.post('/', upload.single('file'), fileCtrl.post);


module.exports = router;
