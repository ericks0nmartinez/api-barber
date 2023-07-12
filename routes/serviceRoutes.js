const router = require('express').Router()
const Services = require('../models/Services')

//Create
router.post('/', async (req, res) => {
  const { idCustomer, finalyService, service } = req.body
  const services = { idCustomer, finalyService, service }

  try {
    const service = await Services.create(services)
    res.status(201).json(service)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Read
router.get('/', async (req, res) => {
  try {
    const service = await Services.find()
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:idCustomer', async (req, res) => {
  const id = req.params.idCustomer
  try {
    const service = await Services.find({ idCustomer: id, finalyService: false })
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { finalyService, service } = req.body
  const services = { finalyService, service }

  try {
    const updateServices = await Services.updateOne({ _id: id }, services)
    if (updateServices.matchedCount === 0) {
      res.status(422).json({ msg: 'Services not found' })
      return
    }
    res.status(200).json(services)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const services = await Services.find({ _id: id })
  if (!services) {
    res.status(422).json({ msg: 'Services not found' })
    return
  }

  try {
    await Services.deleteOne({ _id: id })

    res.status(200).json({ msg: 'Customer delete success' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
