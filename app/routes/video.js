const express = require('express');
const nodemon = require('nodemon');
const router = express.Router();

//Controlador das rotas
const VideoController = require('../controllers/videoController');

//Rotas atividade
router.get('/', VideoController.listAll);
router.get('/:id', VideoController.listSingle);
router.delete('/delete/:id', VideoController.deleteSingle);
router.put('/update/:id', VideoController.updateSingle);
router.post('/cadaster', VideoController.createAtv);

//Exportar rota
module.exports = router;