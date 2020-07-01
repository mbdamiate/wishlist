
const express = require('express')

const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helmet = require('helmet')
const compression = require('compression')

const app = express()

const database = require('./database')
const request = require('./request')

const validator = require('../api/middlewares/validator.middleware')

// Health
const healthRoute = require('../api/routes/health.route')

// User
const userRepository = require('../api/repositories/user.repository')(database)
const userController = require('../api/controller/user.controller')(userRepository)
const userValidation = require('../api/validators/user.validators')
const userRouter = express.Router()
const userRoute = require('../api/routes/user.route')(userRouter, userController, validator, userValidation)

// Product
const productRepository = require('../api/repositories/product.repository')(request)
const productController = require('../api/controller/product.controller')(productRepository)
const productValidation = require('../api/validators/product.validators')
const productRouter = express.Router()
const productRoute = require('../api/routes/product.route')(productRouter, productController, validator, productValidation)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use(cors())
app.use(methodOverride())
app.use(helmet())
app.use(compression())

app.use('/api/health', healthRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)

module.exports = app
