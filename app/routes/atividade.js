const express = require('express');
const nodemon = require('nodemon');
const router = express.Router();
const confidence = require('../controllers/authenticationController');

//Controlador das rotas
const AtividadeController = require('../controllers/atividadeController');

//Rotas atividade
router.get('/', AtividadeController.listAll);
router.get('/:id', AtividadeController.listSingle);
router.delete('/delete/:id', confidence.verification, AtividadeController.deleteSingle);
router.put('/update/:id', confidence.verification, AtividadeController.updateSingle);
router.post('/cadaster', AtividadeController.createAtv);

//Exportar rota
module.exports = router;
