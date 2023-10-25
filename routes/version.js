const router = require("express").Router()
//Read
router.get('/',  (req, res) => {
  try {
    res.status(200).json({ versão: '1.0.0' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
