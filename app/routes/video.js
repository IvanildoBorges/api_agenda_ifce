const express = require('express');
const nodemon = require('nodemon');
const router = express.Router();
const confidence = require('../controllers/authenticationController');

//Controlador das rotas
const VideoController = require('../controllers/videoController');

//Rotas atividade
router.get('/', VideoController.listAll);
router.get('/:id', VideoController.listSingle);
router.delete('/delete/:id', confidence.verification, VideoController.deleteSingle);
router.put('/update/:id', confidence.verification, VideoController.updateSingle);
router.post('/cadaster', VideoController.createAtv);

//Exportar rota
module.exports = router;