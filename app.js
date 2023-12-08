// app.js
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(bodyParser.json())

// Rutas
app.use('/api', userRoutes)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`)
})
