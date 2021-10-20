"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var store = require('./store-photos');

var request = require('request-promise-native');

var Photo = require('./model-photos');

var fs = require("fs"); // Descomentar para ejecucion en local
// const { FACE_DETECTION, FACE_EMOTIONS, FACE_TOKEN } = require('../../config');
// Descomentar para ejecucion en heroku


var FACE_DETECTION = process.env.FACE_DETECTION;
var FACE_EMOTIONS = process.env.FACE_EMOTIONS;
var FACE_TOKEN = process.env.FACE_TOKEN;

var getIndex = function getIndex() {
  var index;
  return regeneratorRuntime.async(function getIndex$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(store.index());

        case 2:
          index = _context.sent;
          return _context.abrupt("return", index);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var makeRequest = function makeRequest(method, url, datos) {
  var files,
      data,
      _i,
      _Object$keys,
      i,
      options,
      response,
      _args2 = arguments;

  return regeneratorRuntime.async(function makeRequest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          files = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : {};
          data = JSON.parse(JSON.stringify(datos));

          for (_i = 0, _Object$keys = Object.keys(files); _i < _Object$keys.length; _i++) {
            i = _Object$keys[_i];
            data[i] = fs.createReadStream(files[i]);
          }

          options = {
            method: method,
            url: url,
            headers: {
              'token': FACE_TOKEN
            },
            formData: data
          };
          _context2.next = 6;
          return regeneratorRuntime.awrap(request(options)["catch"](function (e) {
            return console.log('Hubo un error al analizar la foto: ', e);
          }));

        case 6:
          response = _context2.sent;
          return _context2.abrupt("return", response);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var addPhoto = function addPhoto(reqBody) {
  return new Promise(function _callee(resolve, reject) {
    var indice, analysis, emotions, emotionToDB, emociones, valores, maxVal, newPhoto;
    return regeneratorRuntime.async(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(getIndex());

          case 3:
            indice = _context3.sent;

            if (!(indice > 180)) {
              _context3.next = 8;
              break;
            }

            console.error("[photoController] Limite de participantees por hoy");
            reject("LLegamos al limite de fotos por hoy, intentalo mañana");
            return _context3.abrupt("return", false);

          case 8:
            _context3.next = 10;
            return regeneratorRuntime.awrap(makeRequest("POST", FACE_DETECTION, {
              "photo": reqBody.snap
            }, {}).then(function (response) {
              if (!response) {
                reject("[makeRequest] No se detecto rostro en la foto");
                return false;
              } else {
                return response;
              }
            })["catch"](function (e) {
              return console.error(e);
            }));

          case 10:
            analysis = _context3.sent;
            analysis = JSON.parse(analysis); // Revisa si hay la informacion del analisis de rostro

            if (!(analysis.length == 0)) {
              _context3.next = 16;
              break;
            }

            console.error("[photoController] No se detecto ningun rostro");
            reject("No hay rostro en la foto");
            return _context3.abrupt("return", false);

          case 16:
            _context3.next = 18;
            return regeneratorRuntime.awrap(makeRequest("POST", FACE_EMOTIONS, {
              "photo": reqBody.snap
            }, {}).then(function (response) {
              if (!response) {
                reject("[makeRequest] No se detectaron emociones en la foto");
                return false;
              } else {
                return response;
              }
            })["catch"](function (e) {
              return console.error(e);
            }));

          case 18:
            emotions = _context3.sent;

            if (emotions) {
              _context3.next = 23;
              break;
            }

            console.error("[makeRequest] No se detectaron emociones");
            reject("No hay rostro en la foto");
            return _context3.abrupt("return", false);

          case 23:
            emotions = JSON.parse(emotions); // Revisa si la peticion para la deteccion de emociones es exitosa

            if (!(emotions.status === 'failure')) {
              _context3.next = 28;
              break;
            }

            console.error("[photoController] No se detectaron emociones en el rostro");
            reject("No se detectaron emociones en el rostro, intentalo de nuevo");
            return _context3.abrupt("return", false);

          case 28:
            if (!emotions.faces[0]) {
              emotions.faces[0] = {
                rectangle: {
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0
                },
                emotions: {
                  cubrebocas: 1
                }
              };
              emotionToDB = ["cubrebocas", "1"];
            } else {
              emociones = Object.entries(emotions.faces[0].emotions); // console.log(emociones);

              valores = Object.values(emotions.faces[0].emotions);
              maxVal = Math.max.apply(Math, _toConsumableArray(valores));
              emociones.forEach(function (value) {
                if (value[1] === maxVal) {
                  emotionToDB = value;
                }
              });
            }

            newPhoto = new Photo({
              // lat: reqBody.lat,
              // lon: reqBody.lon,
              image: reqBody.snap,
              age: analysis[0].age,
              gender: analysis[0].gender.value,
              genProb: analysis[0].gender.probability,
              emotion: emotionToDB[0],
              emotionProb: emotionToDB[1],
              place: 'APP',
              index: indice
            });
            store.add(newPhoto);
            resolve(newPhoto);
            _context3.next = 37;
            break;

          case 34:
            _context3.prev = 34;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);

          case 37:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 34]]);
  });
};

var getPhoto = function getPhoto() {};

var listPhotos = function listPhotos() {
  console.log("Listando fotos");
  return new Promise(function (resolve, reject) {
    resolve(store.list());
  });
};

module.exports = {
  addPhoto: addPhoto,
  getPhoto: getPhoto,
  listPhotos: listPhotos
};