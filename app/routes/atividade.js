const express = require('express');
const nodemon = require('nodemon');
const router = express.Router();

//Controlador das rotas
const AtividadeController = require('../controllers/atividadeController');

//Rotas atividade
router.get('/', AtividadeController.listAll);
router.get('/:id', AtividadeController.listSingle);
router.delete('/delete/:id', AtividadeController.deleteSingle);
router.put('/update/:id', AtividadeController.updateSingle);
router.post('/cadastrar', AtividadeController.createAtv);

//Exportar rota
module.exports = router;
