const express = require('express');
const router = express.Router();
const boutiqueCtrl = require('../controllers/boutiqueCtrl');

router.get('/', boutiqueCtrl.findAll);
router.get('/:id', boutiqueCtrl.findById);

module.exports = router;
