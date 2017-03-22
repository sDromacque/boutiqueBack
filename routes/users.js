const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.json('ok');
});

router.get('/:id', (req, res) => {

});

module.exports = router;
