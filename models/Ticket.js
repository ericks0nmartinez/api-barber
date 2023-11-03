const mongoose = require('mongoose')

const Tickets = mongoose.model('Ticket', {
  idCustomer: String,
  ticket: Number,
  data: String,
  hora: String,
  professional: String,
  scheduling: String,
  answered: Boolean
})

module.exports = Tickets
