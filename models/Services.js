const mongoose = require('mongoose')

const Services = mongoose.model('Services', {
  idCustomer: String,
  finalyService: Boolean,
  service: [],
  idSheduling: String
})

module.exports = Services
