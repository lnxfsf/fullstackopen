require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_PASS = process.env.MONGODB_PASS

module.exports = { MONGODB_PASS, PORT }