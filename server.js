
const express = require('express');
// const {DB_URI, PORT} = require('./config.js');
const db = require('./db.js');
const router = require('./network/routes')
const DB_URI = process.env.DB_URI;
const PORT = procees.env.PORT;

db.connect(DB_URI);

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
  extended: false,
  limit: '50mb',
}));

router(app);

app.use('/', express.static('public'));

app.listen(PORT);
console.log("Servidor escuchando en el puerto: ", PORT);