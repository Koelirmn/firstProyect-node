// routes/userRoutes.js
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticateToken = require('../middleware/authenticateToken') // Solo importa la función middleware

// Endpoins publicos
router.post('/users/login', userController.login)

// Endpoints protegidos por token
// router.use(authenticateToken)

// Definir rutas para usuarios
router.get('/users/showUsers', userController.getAllUsers)
router.get('/users/getUser/:id', userController.getUserById)
router.post('/users/createUser', userController.createUser)
router.put('/users/updateUser/:id', authenticateToken, userController.updateUser)
router.delete('/users/deleteUser/:id', authenticateToken, userController.deleteUser)

module.exports = router
