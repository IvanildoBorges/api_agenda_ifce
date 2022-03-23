const pg = require("pg");
const envs = require('../config/variaveis');

const pool = pg.createPool({
    "connectionLimit": 50,
    "user": envs.pg.usuario || process.env.USER,
    "password": envs.pg.senha || process.PASSWORD,
    "database": envs.pg.db || process.env.DATABASE,
    "host": process.env.HOST || envs.pg.host,
    "port": envs.pg.porta || process.env.PORT
});

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

exports.pool = pool;