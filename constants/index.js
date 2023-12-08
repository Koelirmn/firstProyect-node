require('dotenv').config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

// Server constants
const NODE_ENV = process.env.NODE_ENV || 'development'
const ORIGIN = '*'
const PORT = process.env.PORT || 3000
// JWT constants
const JWT_SECRET = process.env.JWT_SECRET || 'unsafe_secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h'
const JWT_COOKIE_NAME_EXPIRES_IN =
  process.env.JWT_COOKIE_NAME_EXPIRES_IN || 1000 * 60 * 60 * 24 * 7 // 7 days

// db constants
const DB_NAME = process.env.DB_NAME || 'nodeDatabase'
const DB_USERNAME = process.env.DB_USERNAME || 'postgres'
const DB_PASSWORD = process.env.DB_PASSWORD || 'password'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_DIALECT = process.env.DB_DIALECT || 'postgres'

module.exports = { NODE_ENV, ORIGIN, PORT, JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_NAME_EXPIRES_IN, ACCESS_TOKEN_SECRET, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT }
