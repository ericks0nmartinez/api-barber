const mongoose = require('mongoose')

const BarberProduct = mongoose.model('BarberProduct', {
  status: Boolean,
  name: String,
  value: String,
})

module.exports = BarberProduct
