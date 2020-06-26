const process = require('process')

const app = require('./config/app')

const PORT = process.env.PORT || 8080

app.listen(PORT)
