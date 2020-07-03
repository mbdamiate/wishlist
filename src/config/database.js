module.exports = ({
  pg,
  connectionString
}) => {

  const pool = new pg.Pool({ connectionString })

  return pool

}
