const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');


router.get('/', userCtrl.findAll);
router.get('/:id', userCtrl.findById);
router.post('/', userCtrl.post);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.delete);

module.exports = router;
