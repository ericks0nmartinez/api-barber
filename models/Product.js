const mongoose = require('mongoose')

const Products = mongoose.model('Product', {
  idCustomer: String,
  finalyProduct: Boolean,
  product: [],
  idSheduling: String
})

module.exports = Products
