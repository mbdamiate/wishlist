const express = require('express')

const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

const home = require('../api/routes/home.route')
const user = require('../api/routes/user.route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))
app.use(cors())

app.use('/', home)
app.use('/users', user)

module.exports = app
