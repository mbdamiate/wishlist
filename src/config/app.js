
const express = require('express')

const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helmet = require('helmet')
const compression = require('compression')

const router = express.Router()
const app = express()

const database = require('./database')
const validator = require('../api/middlewares/validator.middleware')

const healthRoute = require('../api/routes/health.route')

const userRepository = require('../api/repositories/user.repository')(database)
const userController = require('../api/controller/user.controller')(userRepository)
const userValidation = require('../api/validators/user.validators')
const userRoute = require('../api/routes/user.route')(router, userController, validator, userValidation)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use(cors())
app.use(methodOverride())
app.use(helmet())
app.use(compression())

app.use('/api/health', healthRoute)
app.use('/api/users', userRoute)

module.exports = app
