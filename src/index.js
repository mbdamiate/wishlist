
const process = require('process')
const dotenv = require('dotenv-safe')
Promise = require('bluebird')

dotenv.config()

const app = require('./config/app')

const PORT = process.env.PORT || 5050

app.listen(PORT)
