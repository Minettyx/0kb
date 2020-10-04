const express = require('express');
const router = express.Router();

const create = require('./create');

router.use('/createLink', create);

module.exports = router;
