"use strict";

var express = require('express');

var db = require('./db.js');

var router = require('./network/routes'); // Descomentar para probar en local


var _require = require('./config.js'),
    DB_URI = _require.DB_URI,
    PORT = _require.PORT; // Descomentar para probar en el servidor heroku
// const DB_URI = process.env.DB_URI;
// const PORT = process.env.PORT;


db.connect(DB_URI);
var app = express();
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  extended: false,
  limit: '50mb'
}));
router(app);
app.use('/', express["static"]('public'));
app.listen(PORT);
console.log("Servidor escuchando en el puerto: ", PORT);