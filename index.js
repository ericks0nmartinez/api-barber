// config inicial
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
require('dotenv').config()


const app = express()
const barberProfessional = require('./routes/barberProfessionalRoutes')
const customer = require('./routes/customerRoutes')
const products = require('./routes/productRoutes')
const schedules = require('./routes/schedulingRoutes')
const services = require('./routes/serviceRoutes')
const barberServices = require('./routes/barberServicesRoutes')
const barberProducts = require('./routes/barberProductRoutes')
const version = require('./routes/version')
//forma de ler JSON / mid

const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const port = process.env.PORT || 4000
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(cors(corsOptions))
app.use(express.json())

// rota da api
app.use('/barber-professional', barberProfessional)
app.use('/barber-services', barberServices)
app.use('/barber-products', barberProducts)
app.use('/customer', customer)
app.use('/schedules', schedules)
app.use('/products', products)
app.use('/services', services)

// rota inicial
app.use('/', version)

// entregar uma porta
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.fbvg93b.mongodb.net/bancoapi`
)
  .then(() => {
    console.log('Conectamos ao MongoDB')
    app.listen(port)
  })
  .catch((err) => console.log(err))
