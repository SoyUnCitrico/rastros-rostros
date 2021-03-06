const express = require('express');
const response = require('../../network/response');
const controller = require('./controller-photos');
const router = express.Router();


router.get('/', async(req,res) => {
    // console.log("Entrando al GET network");
    controller.listPhotos()
        .then(doc => {
            response.succes(req, res, doc, 201);
        })
        .catch(e => {
            // console.error("catching error", e);
            response.error(res,req,'Foto invalida', 400, 'Error al postear foto');
        })
    }
);

router.post('/', (req, res) => {
    controller.addPhoto(req.body)
        .then(newPhoto => {
            response.succes(req, res, newPhoto, 201);
        })
        .catch(e => {
            console.error("catching error", e);
            response.error(req, res, "Fotografia invalida", 400, e);
        })
    }
);


module.exports = router;