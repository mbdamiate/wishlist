
const process = require('process')
Promise = require('bluebird')

const app = require('./config/app')

const PORT = process.env.PORT || 8080

app.listen(PORT)
