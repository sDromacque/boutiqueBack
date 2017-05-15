const express = require('express');
const router = express.Router();
const tagCtrl = require('../controllers/tagCtrl');


router.get('/', tagCtrl.findAll);
router.get('/:id', tagCtrl.findById);
router.delete('/:id', tagCtrl.delete);
router.put('/:id', tagCtrl.update);
router.post('', tagCtrl.post);

module.exports = router;
