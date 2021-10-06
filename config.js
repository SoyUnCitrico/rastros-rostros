const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URI: process.env.DB_URI || 'mongodb+srv://emmeDB:EplIcmSTrFw6qPNL@cluster0.ezzfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  PORT: process.env.PORT || 5500,
}
