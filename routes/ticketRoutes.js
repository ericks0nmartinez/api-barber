const router = require('express').Router()

const Tickets = require('../models/Ticket')
const Schedules = require('../models/Scheduling')

//Create
router.post('/', async (req, res) => {
  const { idCustomer, data, answered } = req.body
  const tickets = { idCustomer, data, answered }

  try {
    const ticketed = await Tickets.find()
    tickets.ticket = ticketed.length + 1
    const dia = new Date()
    tickets.data = `${dia.toLocaleDateString()}`
    const horaLocal = parseInt(dia.toLocaleTimeString().split(':')[0]) - 1
    tickets.hora =
      horaLocal < 10
        ? `0${horaLocal}:${dia.toLocaleTimeString().split(':')[1]}:${
            dia.toLocaleTimeString().split(':')[2]
          }`
        : `${horaLocal}:${dia.toLocaleTimeString().split(':')[1]}:${
            dia.toLocaleTimeString().split(':')[2]
          }`

    const ticket = await Tickets.create(tickets)
    res.status(201).json(ticket)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/cron', async (req, res) => {
  const dia = new Date()
  const data = `${dia.toLocaleDateString().replace('-', '/').replace('-', '/')}`
  const createTicket = async ticket => {
    const ticketed = await Tickets.find()
    ticket.ticket = ticketed.length + ticket.ticket
    await Tickets.create(ticket)
  }
  try {
    const schedules = await Schedules.find({ data: data, scheduling: true })

    function convertToDateObject (dateString, timeString) {
      const [day, month, year] = dateString.split('/').map(Number)
      const [hour, minute, second = 0] = timeString.split(':').map(Number)
      // O mês no objeto Date é base zero, então subtraímos 1 do mês
      return new Date(year, month - 1, day, hour, minute, second)
    }

    schedules.sort((a, b) => {
      const dateA = convertToDateObject(a.data, a.hora)
      const dateB = convertToDateObject(b.data, b.hora)

      // Compara as datas para ordenação
      return dateA - dateB
    })

    const intervals = []
    let hour = 9
    let minute = 0

    while (hour <= 20 || (hour === 20 && minute === 30)) {
      intervals.push(
        `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`
      )
      minute += 30

      if (minute === 60) {
        hour++
        minute = 0
      }
    }

    intervals.forEach((element, index) => {
      schedules.forEach(schedule => {
        if (schedule.hora == element) {
          createTicket({
            idCustomer: schedule.idCustomer,
            data: schedule.data,
            professional: schedule.professional,
            scheduling: schedule.scheduling,
            hora: schedule.hora,
            answered: false,
            ticket: index + 1
          })
        }
      })
    })

    res.status(201).json({ msg: 'sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Read
router.get('/attended', async (req, res) => {
  try {
    const ticket = await Tickets.find({ answered: true })
    function ordenarPorTicket (arr) {
      arr.sort((a, b) => a.ticket - b.ticket)
      return arr
    }

    let ticketeds = ordenarPorTicket(ticket)
    res.status(200).json(ticketeds)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/answer', async (req, res) => {
  try {
    const ticket = await Tickets.find({ answered: false })
    function ordenarPorTicket (arr) {
      arr.sort((a, b) => a.ticket - b.ticket)
      return arr
    }

    let ticketeds = ordenarPorTicket(ticket)
    res.status(200).json(ticketeds)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/all', async (req, res) => {
  try {
    const ticket = await Tickets.find()
    function ordenarPorTicket (arr) {
      arr.sort((a, b) => a.ticket - b.ticket)
      return arr
    }

    let ticketeds = ordenarPorTicket(ticket)
    res.status(200).json(ticketeds)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:idCustomer', async (req, res) => {
  const id = req.params.idCustomer
  try {
    const ticket = await Tickets.find({ idCustomer: id, answered: false })

    res.status(200).json(ticket)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { idCustomer, ticket, data, hora, professional, scheduling, answered } =
    req.body

  const ticketed = {
    idCustomer,
    scheduling,
    professional,
    data,
    hora,
    answered,
    ticket
  }
  try {
    await Tickets.updateOne({ _id: id }, ticketed)
    const ticket = await Tickets.find({ _id: id })

    res.status(200).json(ticket)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Delete
router.delete('/all', async (req, res) => {
  try {
    await Tickets.deleteMany()

    res.status(200).json({ msg: 'Products delete success' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
