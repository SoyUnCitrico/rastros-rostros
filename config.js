const dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
  throw result.error
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
  FACE_TOKEN: process.env.FACE_TOKEN,
  FACE_DETECTION: process.env.FACE_DETECTION,
  FACE_EMOTIONS: process.env.FACE_EMOTIONS,
}
