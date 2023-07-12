const mongoose = require('mongoose')

const Scheduling = mongoose.model('Scheduling', {
  idCustomer: String,
  scheduling: Boolean,
  data: String,
  hora: String,
  updateData: String,
  updateHora: String,
  professional: String
})

module.exports = Scheduling
