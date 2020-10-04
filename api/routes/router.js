const express = require('express');
const router = express.Router();

const create = require('./create');

router.use('/createLink', search);

module.exports = router;
