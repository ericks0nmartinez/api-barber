const mongoose = require('mongoose')

const Customer = mongoose.model('Customer', {
  status: Boolean,
  name: String,
  phone: String,
})

module.exports = Customer
