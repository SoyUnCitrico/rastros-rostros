"use strict";

var express = require('express');

var response = require('../../network/response');

var controller = require('./controller-message');

var router = express.Router();
router.get('/', function (req, res) {
  controller.getMessages().then(function (messageList) {
    response.succes(req, res, messageList, 200);
  })["catch"](function (e) {
    response.succes(req, res, "Error Inesperado", 500, e);
  });
});
router.post('/', function (req, res) {
  controller.addMessage(req.body.user, req.body.message).then(function (fullMessage) {
    response.succes(req, res, fullMessage, 201);
  })["catch"](function (e) {
    response.error(req, res, "Informacion invalida", 400, "Error en el controlador");
  });
});
router.patch('/:id', function (req, res) {
  console.log(req.params.id);
  controller.updateMessage(req.params.id, req.body.message).then(function (data) {
    response.succes(req, res, data, 200);
  }).cathc(function (e) {
    response.error(req, res, "error interno", 500, e);
  });
});
module.exports = router;