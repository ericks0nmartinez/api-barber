const router = require("express").Router()

const Customer = require('../models/Customer')

//Create
router.post('/', async (req, res) => {
  const { status, name, phone } = req.body
  const customer = { status, name, phone }

  try {
    if (customer.name !== '' && customer.phone !== '') {
      const id = await Customer.create(customer)
      res.status(201).json({ _id: id._id.toHexString() })
    } else {
      res.status(500).json({ msg: `Falta prencher ${customer.name === '' ? 'name' : 'phone'}` })
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Read
router.get('/', async (req, res) => {
  try {
    const customer = await Customer.find()
    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const customer = await Customer.find({ _id: id })
    if (!customer) {
      res.status(422).json({ msg: 'Custumer not found' })
      return
    }
    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:phone', async (req, res) => {
  const phone = req.params.phone
  try {
    const customer = await Customer.find({ phone: phone })
    if (!customer) {
      res.status(422).json({ msg: 'Custumer not found' })
      return
    }
    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { status, name, phone } = req.body
  const customer = { status, name, phone }

  try {
    const updateCustomer = await Customer.updateOne({ _id: id }, customer)
    if (updateCustomer.matchedCount === 0) {
      res.status(422).json({ msg: 'Custumer not found' })
      return
    }
    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const customer = await Customer.find({ _id: id })
  if (!customer) {
    res.status(422).json({ msg: 'Custumer not found' })
    return
  }

  try {
    await Customer.deleteOne({ _id: id })

    res.status(200).json({ msg: 'Customer delete success' })
  } catch (error) {
    res.status(500).json({ error: error })
  }

})

module.exports = router
