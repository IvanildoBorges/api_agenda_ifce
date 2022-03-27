const pg = require('../database/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.listAll = async (req, res, next) => {
    try {
        const query = `SELECT * FROM video`;
        const result = await pg.query(query);
        return res.status(200).send({ response: true, data: result });
        pg.end()
    } catch (error) {
        return res.status(500).send({ response: false, erro: "Erro ao listar tudo! " + error });
        pg.end()
    }
};

exports.listSingle = async (req, res, next) => {
    try {
        const query = `SELECT * FROM video WHERE id = $1`;   //Se for usar o Mysql tem que trocar o $1 por ?
        const result = await pg.query(query, [req.params.id]);
        return res.status(200).send({ response: true, data: result });
        pg.end()
    } catch (error) {
        return res.status(500).send({ response: false, erro: "Erro ao listar! " + error });
        pg.end()
    }
};

exports.createAtv = async (req, res, next) => {
    //
};

exports.deleteSingle = async (req, res, next) => {
    //
};

exports.updateSingle = async (req, res, next) => {
    //
};