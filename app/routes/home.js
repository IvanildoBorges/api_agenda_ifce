const express = require('express');
const nodemon = require('nodemon');
const router = express.Router();

//Importando controladores da rota agenda
const HomeController = require('../controllers/homeController');

//rotas agenda
router.get('/', HomeController.welcome);

module.exports = router;