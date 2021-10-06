
const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config.js');
const router = require('./network/routes')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

router(app);
app.use('/rostros/', express.static('public'));

app.listen(config.PORT);
console.log("Servidor escuchando en el puerto: ", config.PORT);