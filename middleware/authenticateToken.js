// middleware/authenticateToken.js

const { JWT_SECRET } = require('../constants')

const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Acceso prohibido. Token inválido.' })
    }

    req.user = user
    next()
  })
}

module.exports = authenticateToken
