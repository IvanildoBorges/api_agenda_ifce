const pg = require('../database/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.listAll = async (req, res, next) => {
    try {
        const query = `SELECT * FROM atividade`;
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
        const query = `SELECT * FROM atividade WHERE id = $1;`;   //Se for usar o Mysql tem que trocar o $1 por ?
        const result = await pg.query(query, [req.params.id]);
        return res.status(200).send({ response: true, data: result });
        pg.end()
    } catch (error) {
        return res.status(500).send({ response: false, erro: "Erro ao listar! " + error });
        pg.end()
    }
};

exports.createAtv = async (req, res, next) => {
    try {
        const query = `SELECT * FROM atividade WHERE titulo = $1;`;
        const results = await pg.query(query, [req.body.titulo]);

        if (results.length > 0) {
            res.status(409).send({ response: false, error: 'Atividade já cadastrada!' });
        } else {
            const query2 = `INSERT INTO atividade(titulo, descricao, dataDaAtividade) VALUES ($1,$2,$3);`;
            const results = await pg.query(
                query2,
                [
                  req.body.titulo,
                  req.body.descricao,
                  req.body.dataDaAtividade,
                ]
            );
            
            return res.status(201).send({ response: true, data: "Deu certo!" });

        }
        
    } catch (error) {
        return res.status(500).send({ response: false, erro: "Erro ao Criar! " + error });
        pg.end()
    }
};

exports.deleteSingle = async (req, res, next) => {
    //
};

exports.updateSingle = async (req, res, next) => {
    //
};