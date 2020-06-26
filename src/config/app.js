const express = require('express')

const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

const home = require('../api/routes/home.route')
const user = require('../api/routes/user.route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use(cors())
app.use(methodOverride())

app.use('/', home)
app.use('/api/users', user)

module.exports = app
