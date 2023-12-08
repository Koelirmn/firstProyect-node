// controllers/userController.js

const { JWT_EXPIRES_IN, JWT_SECRET } = require('../constants')
const { User } = require('../db')
const jwt = require('jsonwebtoken') // jwt (jason web token) es una librería para generar tokens
const bcrypt = require('bcrypt') // bcryot es una librería para encriptar contraseñas

// Controladores para operaciones de usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener usuarios.' })
  }
}

const getUserById = async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findByPk(userId)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener usuario.' })
  }
}
// createUser es un controlador asíncrono que recibe los datos del usuario desde el cuerpo de la petición (req.body) y los guarda en la base de datos usando el método create de Sequelize. Si la operación es exitosa, se responde con el usuario creado y un código de estado 201 (creado). Si ocurre un error, se responde con un código de estado 500 (error interno del servidor) y un mensaje de error.
const createUser = async (req, res) => {
  const { firstName, lastName, dateBirth, address, password, mobilePhone, email } = req.body

  try {
    const newUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      date_birth: dateBirth,
      address,
      password: bcrypt.hashSync(password, 12),
      mobile_phone: mobilePhone,
      email
    })

    res.status(201).json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear usuario.' })
  }
}

const updateUser = async (req, res) => {
  const userId = req.params.id
  const { firstName, lastName, dateBirth, address, password, mobilePhone, email } = req.body

  try {
    const user = await User.findByPk(userId)
    if (user) {
      await user.update({
        first_name: firstName,
        last_name: lastName,
        date_birth: dateBirth,
        address,
        password,
        mobile_phone: mobilePhone,
        email
      })
      res.json(user)
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar usuario.' })
  }
}

const deleteUser = async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findByPk(userId)
    if (user) {
      await user.destroy()
      res.json({ message: 'Usuario eliminado correctamente.' })
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar usuario.' })
  }
}

const login = async (req, res) => {
  const { mobilePhone, password } = req.body

  try {
    const user = await User.findOne({ where: { mobile_phone: mobilePhone } })

    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = generateAccessToken(user)
      res.json({
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name
          // ... otros campos necesarios
        },
        access_token: accessToken,
        token_type: 'bearer'
      })
    } else {
      res.status(401).json({ error: 'Usuario o contraseña incorrectos.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al realizar el inicio de sesión.' })
  }
}

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      mobile_phone: user.mobile_phone,
      email: user.email
    },
    JWT_SECRET, // Ajusta la firma del token según se necesite
    { expiresIn: JWT_EXPIRES_IN } // Ajusta la duración del token según se necesite
  )
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
}
