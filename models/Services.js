const mongoose = require('mongoose')

const Services = mongoose.model('Services', {
  idCustomer: String,
  finalyService: Boolean,
  service: []
})

module.exports = Services
