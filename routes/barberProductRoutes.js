const router = require("express").Router()

const BarberProduct = require('../models/BarberProduct')

//Create
router.post('/', async (req, res) => {
  const { status, name, value } = req.body
  const barberProduct = { status, name, value }

  try {
    const id = await BarberProduct.create(barberProduct)
    res.status(201).json({ _id: id._id.toHexString() })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Read
router.get('/', async (req, res) => {
  try {
    const barberProduct = await BarberProduct.find()
    res.status(200).json(barberProduct)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { status, name, value } = req.body
  const barberProduct = { status, name, value }

  try {
    const updateBarberProduct = await BarberProduct.updateOne({ _id: id }, barberProduct)
    if (updateBarberProduct.matchedCount === 0) {
      res.status(422).json({ msg: 'Barber product not found' })
      return
    }
    res.status(200).json(barberProduct)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const barberProduct = await BarberProduct.find({ _id: id })
  if (!barberProduct) {
    res.status(422).json({ msg: 'Barber product not found' })
    return
  }

  try {
    await BarberProduct.deleteOne({ _id: id })

    res.status(200).json({ msg: 'Barber product delete success' })
  } catch (error) {
    res.status(500).json({ error: error })
  }

})

module.exports = router
