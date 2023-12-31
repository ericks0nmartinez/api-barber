const router = require("express").Router()

const BaberProfessional = require('../models/BaberProfessional')

//Create
router.post('/', async (req, res) => {
  const { status, name, phone, password, profile } = req.body
  const professional = { status, name, phone, password, profile }

  try {
    if (professional.name !== '' && professional.phone !== '' && professional.password !== '' && profile === "admin" || profile === "barbeiro") {
      const id = await BaberProfessional.create(professional)
      res.status(201).json({ _id: id._id.toHexString() })
    } else {
      res.status(500).json({ msg: `Falta prencher ${professional.name === '' ? 'password' : 'phone'}` })
    }

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Read
router.get('/:phone/:password', async (req, res) => {
  const phone = req.params.phone
  const password = req.params.password
  try {
    const professional = await BaberProfessional.findOne({ phone: phone, password: password })
    if (!professional) {
      return
    }
    res.status(200).json(professional)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/', async (req, res) => {
  try {
    const professionals = await BaberProfessional.find()
    if (!professionals) {
      return
    }
    res.status(200).json([..." ", ...professionals.map(professional => professional.status === true ? professional.name : [' '])])
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { status, name, phone } = req.body
  const professional = { status, name, phone }

  try {
    const updateProfessional = await BaberProfessional.updateOne({ _id: id }, professional)
    if (updateProfessional.matchedCount === 0) {
      res.status(422).json({ msg: 'Professional not found' })
      return
    }
    res.status(200).json(professional)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const professional = await BaberProfessional.find({ _id: id })
  if (!professional) {
    res.status(422).json({ msg: 'Professional not found' })
    return
  }

  try {
    await Professional.deleteOne({ _id: id })

    res.status(200).json({ msg: 'Professional delete success' })
  } catch (error) {
    res.status(500).json({ error: error })
  }

})

module.exports = router
