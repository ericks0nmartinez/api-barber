const router = require('express').Router()

const Schedules = require('../models/Scheduling')

//Create
router.post('/', async (req, res) => {
  const {
    idCustomer,
    scheduling,
    data,
    hora,
    updateData,
    updateHora,
    professional
  } = req.body
  let schedules = {
    idCustomer,
    scheduling,
    data,
    updateData,
    updateHora,
    hora,
    professional
  }

  if (!scheduling) {
    const result2 = new Date().toLocaleString('en-GB', {
      hour12: false
    })

    schedules = {
      idCustomer,
      scheduling,
      data: result2.split(', ')[0],
      hora: result2.split(', ')[1],
      updateData,
      updateHora,
      professional
    }
  }

  try {
    const id = await Schedules.create(schedules)
    res.status(201).json({ _id: id._id.toHexString() })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Read
router.get('/list/:filterDataList', async (req, res) => {
  const filter = req.params.filterDataList
  const data = filter.replace('-', '/').replace('-', '/')
  try {
    if(filter.length === 10){
      const schedules = await Schedules.find({ data: data })

      function convertToDateObject(dateString, timeString) {
        const [day, month, year] = dateString.split('/').map(Number);
        const [hour, minute, second = 0] = timeString.split(':').map(Number);
        // O mês no objeto Date é base zero, então subtraímos 1 do mês
        return new Date(year, month - 1, day, hour, minute, second);
      }

      schedules.sort((a, b) => {
        const dateA = convertToDateObject(a.data, a.hora);
        const dateB = convertToDateObject(b.data, b.hora);

        // Compara as datas para ordenação
        return dateA - dateB;
      });

      res.status(200).json(schedules)
    }else{
      const schedules = await Schedules.find()

      function convertToDateObject(dateString, timeString) {
        const [day, month, year] = dateString.split('/').map(Number);
        const [hour, minute, second = 0] = timeString.split(':').map(Number);
        // O mês no objeto Date é base zero, então subtraímos 1 do mês
        return new Date(year, month - 1, day, hour, minute, second);
      }

      schedules.sort((a, b) => {
        const dateA = convertToDateObject(a.data, a.hora);
        const dateB = convertToDateObject(b.data, b.hora);

        // Compara as datas para ordenação
        return dateA - dateB;
      });

      res.status(200).json(schedules)
    }

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:filter', async (req, res) => {
  const filter = req.params.filter
  const data = filter.replace('-', '/').replace('-', '/')
  try {
    if (filter.length === 10) {
      const schedules = await Schedules.find({ data: data })
      const daySelect = schedules.filter(
        schedule => schedule.scheduling === true
      )
      const hourFree = daySelect.map(day => day.hora)
      res.status(200).json(hourFree)
    } else {
      const schedules = await Schedules.find({ idCustomer: filter })
      const returnId = schedules.filter(
        schedule => schedule.scheduling === true
      )
      res.status(200).json(returnId)
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const {
    idCustomer,
    scheduling,
    professional,
    data,
    hora,
    updateData,
    updateHora
  } = req.body
  const shedules = {
    idCustomer,
    scheduling,
    professional,
    data,
    hora,
    updateData,
    updateHora
  }

  try {
    const updateCustomer = await Schedules.updateOne({ _id: id }, shedules)
    if (updateCustomer.matchedCount === 0) {
      res.status(422).json({ msg: 'Custumer not found' })
      return
    }
    res.status(200)
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
