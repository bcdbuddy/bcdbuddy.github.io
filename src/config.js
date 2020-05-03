const dotenv = require('dotenv')
dotenv.config()

const PORT = Number(process.env.PORT || 80)

module.exports = {
  PORT
}
