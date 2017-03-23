const express = require('express');
const router = express.Router();
const userctrl = require('../controllers/userCtrl');


router.get('/', userctrl.findAll);
router.get('/:id', userctrl.findById);

module.exports = router;
