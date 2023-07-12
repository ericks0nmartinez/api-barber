const mongoose = require('mongoose')

const BarberProfessional = mongoose.model('BarberProfessional', {
  status: Boolean,
  name: String,
  phone: String,
  password: String,
  profile: String
})

module.exports = BarberProfessional
