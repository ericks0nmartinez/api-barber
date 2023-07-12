const mongoose = require('mongoose')

const Professional = mongoose.model('Professional', {
  status: Boolean,
  name: String,
  phone: String,
  password: String,
  profile: String
})

module.exports = Professional
