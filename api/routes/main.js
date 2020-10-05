const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Shorturl = require('../models/url');

router.get('/', (req, res, next) => {
  res.redirect('https://minettyx.com');
});

router.get('/:shortid', (req, res, next) => {

  Shorturl.findOne({'id': req.params.shortid}, {'_id':0, 'url':1}).exec().then(result => {
    if(result) {
      res.redirect(result.url);
    } else {
      const error = new Error('Link not found');
      error.status = 404;
      error.name = "NotFound";
      next(error);
    }
  }).catch(err => next(err));

});

module.exports = router;
