const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9_-]{6,30}$/.test(v);
      },
      message: props => `${props.value} is not a valid id!`
    },
    required: true,
    index: { unique: true }
  },
  url: {
    type: String,
    validate: {
      validator: function(v) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(v);
      },
      message: props => `${props.value} is not a valid url!`
    },
    required: [true, 'Url required']
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shorturl', schema);
