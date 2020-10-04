const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  token: String
});

module.exports = mongoose.model('Authtoken', schema);
