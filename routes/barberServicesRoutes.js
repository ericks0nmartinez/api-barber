const router = require("express").Router()

const BarberServices = require('../models/BarberService')

//Create
router.post('/', async (req, res) => {
  const { status, name, value } = req.body
  const barberServices = { status, name, value }

  try {
    const id = await BarberServices.create(barberServices)
    res.status(201).json({ _id: id._id.toHexString() })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Read
router.get('/', async (req, res) => {
  try {
    const barberServices = await BarberServices.find()
    res.status(200).json(barberServices)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { status, name, value } = req.body
  const barberServices = { status, name, value }

  try {
    const updateBarberServices = await BarberServices.updateOne({ _id: id }, barberServices)
    if (updateBarberServices.matchedCount === 0) {
      res.status(422).json({ msg: 'Barber services not found' })
      return
    }
    res.status(200).json(barberServices)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const barberServices = await BarberServices.find({ _id: id })
  if (!barberServices) {
    res.status(422).json({ msg: 'Barber services not found' })
    return
  }

  try {
    await BarberServices.deleteOne({ _id: id })

    res.status(200).json({ msg: 'Barber services delete success' })
  } catch (error) {
    res.status(500).json({ error: error })
  }

})

module.exports = router
