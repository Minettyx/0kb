const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Shorturl = require('../models/url');

router.get('/', (req, res, next) => {

  const shortid = req.body.id ? req.body.id : makeid(6);

  const shorturl = new Shorturl({
    _id: new mongoose.Types.ObjectId(),
    shortId: shortid,
    url: req.body.url
  });

  shorturl.save().then(result => {
    console.log(result);
  }).catch(err => console.log(err));

  res.status(200).json({
    ok: true,
    id: shortid,
    url: req.body.url
  });

});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

module.exports = router;
