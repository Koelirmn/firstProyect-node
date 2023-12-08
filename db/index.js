// db/index.js
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } = require('../constants')

const { Sequelize } = require('sequelize')
const UserModelDefinition = require('./models/User') // Cambié el nombre de la importación

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT
})

// Verificar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.')
  })
  .catch(err => {
    console.error('No se puede conectar a la base de datos:', err)
  })

// Crear el modelo de usuario usando la instancia de Sequelize
const User = UserModelDefinition(sequelize, Sequelize) // Llamamos a UserModelDefinition con sequelize y Sequelize

// Sincronizar el modelo con la base de datos
sequelize.sync({ force: false })
  .then(() => {
    console.log('Modelo sincronizado con la base de datos.')
  })
  .catch(err => {
    console.error('Error al sincronizar el modelo con la base de datos:', err)
  })

module.exports = {
  sequelize,
  User
}
