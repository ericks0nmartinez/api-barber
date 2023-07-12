const router = require('express').Router()

const Schedules = require('../models/Scheduling')

//Create
router.post('/', async (req, res) => {
  const { idCustomer, scheduling, data, hora, updateData, updateHora, professional } = req.body
  let schedules = { idCustomer, scheduling, data, updateData, updateHora, hora, professional }

  if (!scheduling) {
    const result2 = new Date().toLocaleString('en-GB', {
      hour12: false,
    });

    schedules = { idCustomer, scheduling, data: result2.split(', ')[0], hora: result2.split(', ')[1], updateData, updateHora, professional }
  }

  try {
    await Schedules.create(schedules)
    res.status(201).json({ message: 'Cliente agendado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Read
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedules.find()
    res.status(200).json(schedules)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:idCustomer', async (req, res) => {
  const id = req.params.idCustomer
  try {
    const schedules = await Schedules.find({ idCustomer: id })
    const returnId = schedules.filter(schedule => schedule.scheduling === true)
    res.status(200).json(returnId)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { scheduling, name, phone, date, hora, updateData, updateHora, service, product } = req.body
  const shedules = { scheduling, name, phone, date, hora, updateData, updateHora, service, product }

  try {
    const updateCustomer = await Schedules.updateOne({ _id: id }, shedules)
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

  const shedules = await Schedules.find({ _id: id })
  if (!shedules) {
    res.status(422).json({ msg: 'Schedules not found' })
    return
  }

  try {
    await Schedules.deleteOne({ _id: id })

    res.status(200).json({ msg: 'Schedules delete success' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
