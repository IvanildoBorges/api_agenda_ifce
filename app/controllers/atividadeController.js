const pg = require('../database/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.listAll = async (req, res, next) => {
    try {
        const query = `SELECT * FROM atividade ORDER BY dataDaAtividade ASC`;
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
        const query = `SELECT * FROM atividade WHERE id = $1 ORDER BY dataDaAtividade ASC;`;   //Se for usar o Mysql tem que trocar o $1 por ?
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
        const query = `INSERT INTO atividade(titulo, descricao, dataDaAtividade) VALUES ($1,$2,$3);`;
        const results = await pg.query(
            query,
            [
                req.body.titulo,
                req.body.descricao,
                req.body.dataDaAtividade,
            ]
        );
        
        return res.status(201).send({ response: true, data: "Criada com sucesso!" });
        pg.end()
    } catch (error) {
        return res.status(500).send({ response: false, erro: "Erro ao Criar! " + error });
        pg.end()
    }
};

exports.deleteSingle = async (req, res, next) => {
    try {
        const query = `SELECT * FROM atividade WHERE id = $1;`;
        const results = await pg.query(query, [req.params.id]);

        if (results.length == 0) {
            res.status(404).send({ response: false, error: 'Não foi possivel deletar! Not Found' });
        } else {
            const query2 = `DELETE FROM atividade WHERE id = $1;`;
            const results = await pg.query(query2, [req.params.id]);
            
            return res.status(202).send({ response: true, data: "Excluída com sucesso!" });
        }
        pg.end()
    } catch (error) {
        return res.status(500).send({ response: false, erro: "Erro ao deletar! " + error });
        pg.end()
    }
};

exports.updateSingle = async (req, res, next) => {
    try {
        const query = `SELECT * FROM atividade WHERE id = $1;`;
        const results = await pg.query(query, [req.params.id]);

        if (results.length == 0) {
            res.status(404).send({ response: false, error: 'Não foi possivel atualizar! Not Found' });
        } else {
            const query2 = `UPDATE FROM atividade 
            SET titulo=$2, descricao=$3, dataDaAtividade=$4 
            WHERE id = $1;
            `;
            const results = await pg.query(
                query2, 
                [
                    req.params.id,
                    req.body.titulo,
                    req.body.descricao,
                    req.body.dataDaAtividade,
                ]
            );
            
            return res.status(200).send({ response: true, data: "Atualizada com sucesso!" });
        }
        pg.end()
    } catch (error) {
        return res.status(500).send({ response: false, erro: "Erro ao atualizar! " + error });
        pg.end()
    }
};