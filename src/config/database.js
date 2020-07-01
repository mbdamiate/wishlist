
const process = require('process')
const { Pool } = require('pg')

const pass = process.env.POSTGRES_PASSWORD
const user = process.env.POSTGRES_USER
const db = process.env.POSTGRES_DB
const connectionString = `postgres://${user}:${pass}@0.0.0.0:5432/${db}`

console.log(connectionString)

const pool = new Pool({
  connectionString: process.env.DB_URL || connectionString
})

pool.on('connect', () => {
  console.log({
    message: 'Client was checked in from the pool!'
  })
})

pool.on('acquire', () => {
  console.log({
    message: 'Client was checked out from the pool!',
  })
})

pool.on('error', (err, client) => {
  console.error({
    client,
    err
  })
})

pool.on('remove', (client) => {
  console.log({
    message: 'Client was removed from the pool!'
  })
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
