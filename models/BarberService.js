const mongoose = require('mongoose')

const BarberService = mongoose.model('BarberService', {
  status: Boolean,
  name: String,
  value: String,
})

module.exports = BarberService
