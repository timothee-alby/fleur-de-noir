const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.PGRST_DB_URI, {
  logging: false
})

before(async function() {
  await sequelize.query('DELETE FROM api.rooms')
})
