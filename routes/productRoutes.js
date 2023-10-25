const router = require("express").Router()

const Products = require('../models/Product')

//Create
router.post('/', async (req, res) => {
  const { idCustomer, finalyProduct, product, idSheduling } = req.body
  const products = { idCustomer, finalyProduct, product, idSheduling }

  try {
    const product = await Products.create(products)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Read
router.get('/', async (req, res) => {
  try {
    const product = await Products.find()
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:idCustomer', async (req, res) => {
  const id = req.params.idCustomer
  try {
    const product = await Products.find({ idCustomer: id, finalyProduct: false })

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { finalyProduct, product } = req.body
  const products = { finalyProduct, product }
  try {
    const updateCustomer = await Products.updateOne({ _id: id }, products)
    if (updateCustomer.matchedCount === 0 && product !== '') {
      res.status(422).json({ msg: 'Products not found' })
      return
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const products = await Products.find({ _id: id })
  if (!products) {
    res.status(422).json({ msg: 'Products not found' })
    return
  }

  try {
    await Products.deleteOne({ _id: id })

    res.status(200).json({ msg: 'Products delete success' })
  } catch (error) {
    res.status(500).json({ error: error })
  }

})

module.exports = router
