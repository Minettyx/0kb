const mongoose = require('mongoose');
const bcrypt = require('bcrypt'),

SALT_WORK_FACTOR = 10;

const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  token: String
});

module.exports = mongoose.model('Authtoken', schema);
