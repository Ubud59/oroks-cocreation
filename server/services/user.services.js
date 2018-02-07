const findUserbyId = (pool, externalId) => {
  return pool.query("SELECT * FROM USERS WHERE external_id = $1::text",
  [externalId])
}

module.exports = {
  findUserbyId: findUserbyId
}
