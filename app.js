const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bearerToken = require('express-bearer-token');

const linkRoute = require('./api/routes/api/link');
const indexRoute = require('./api/routes/main');

const Authtoken = require('./api/models/token');

mongoose.connect(process.env.MONGO_URL, {});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bearerToken());

//AUTH

app.use((req, res, next) => {
  if(!req.baseUrl.startsWith('/api')) next();
  if(req.token == process.env.TOKEN) {
    next();
  } else {
    const error = new Error('Authentication Error');
    error.status = 401;
    error.name = "Unauthorized";
    next(error);
  }
});

//CORS and OPTIONS setup
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/link', linkRoute);
app.use('/', indexRoute);


//ERROR handling
app.use((req, res, next) => {
  const error = new Error('Cannot '+req.method+' '+req.path);
  error.status = 404;
  error.name = "NotFound";
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    "error": error.name,
    "message": error.message,
    "status": error.status
  });
})

module.exports = app;
