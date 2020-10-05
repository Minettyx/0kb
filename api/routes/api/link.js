const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Shorturl = require('../../models/url');

router.post('/', (req, res, next) => {

  if(req.token!=process.env.TOKEN){const e=new Error("Authentication Error");e.status=401,e.name="Unauthorized",next(e)}

  const shortid = req.body.id ? req.body.id : makeid(6);

  Shorturl.update({ id: shortid }, { $set: {
    id: shortid,
    url: req.body.url,
    date: Date.now()
  } }, { upsert : true, runValidators: true }).exec().then(result => {
    console.log(result);

    res.status(200).json({
      id: shortid,
      url: req.body.url
    });
  }).catch(err => next(err));

});

router.get('/', (req, res, next) => {

  if(req.token!=process.env.TOKEN){const e=new Error("Authentication Error");e.status=401,e.name="Unauthorized",next(e)}

  Shorturl.find({}, {'_id':0, 'url':1, 'id':1, 'date':1}).exec().then(result => {
    res.status(200).json(result);
  }).catch(err => next(err));

});

router.get('/:shortid', (req, res, next) => {

  if(req.token!=process.env.TOKEN){const e=new Error("Authentication Error");e.status=401,e.name="Unauthorized",next(e)}

  Shorturl.findOne({'id': req.params.shortid}, {'_id':0, 'url':1, 'id':1, 'date':1}).exec().then(result => {
    if(result) {
      res.status(200).json(result);
    } else {
      const error = new Error('Link not found');
      error.status = 404;
      error.name = "NotFound";
      next(error);
    }
  }).catch(err => next(err));

});

router.delete('/:shortid', (req, res, next) => {

  if(req.token!=process.env.TOKEN){const e=new Error("Authentication Error");e.status=401,e.name="Unauthorized",next(e)}

  Shorturl.findOneAndDelete({'id': req.params.shortid}).exec().then(result => {
    if(result) {
      res.status(200).json({deleted: true});
    } else {
      const error = new Error('Link not found');
      error.status = 404;
      error.name = "NotFound";
      next(error);
    }
  }).catch(err => next(err));

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
