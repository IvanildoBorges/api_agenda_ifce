const { Client, Pool } = require("pg");
const envs = require('../config/variaveis');

//pool usara variáveis ​​de ambiente para informações de conexão
const pool = new Pool({
    user: envs.pg.usuario || process.env.USER,
    password: envs.pg.senha || process.env.PASSWORD,
    database: envs.pg.db || process.env.DATABASE,
    host: process.env.HOST || envs.pg.host,
    port: envs.pg.porta || process.env.PORT
});

module.exports = {
    async query(text, params) {
        const start = Date.now()
        const res = await pool.query(text, params)
        const duration = Date.now() - start
        console.log('executed query:', { text, duration, rows: res.rowCount })

        return res.rows
    },
    async getClient() {
        const client = await pool.connect()
        const query = client.query
        const release = client.release

        // definir um tempo limite de 5 segundos, após o qual registraremos a última consulta deste cliente
        const timeout = setTimeout(() => {
            console.error('A client has been checked out for more than 5 seconds!')
            console.error(`The last executed query on this client was: ${client.lastQuery}`)
        }, 5000)

        // Monkey patch o método de consulta para acompanhar a última consulta executada
        client.query = (...args) => {
            client.lastQuery = args
            return query.apply(client, args)
        }
        client.release = () => {
            // limpa nosso tempo limite
            clearTimeout(timeout)

            // define os métodos de volta para sua versão antiga sem patch de macaco
            client.query = query
            client.release = release
            return release.apply(client)
        }

        return client
    }
  }

// const mysql = require("mysql");
// const envs = require('../config/variaveis');
//
// const pool = mysql.createPool({
//     "connectionLimit": 50,
//     "user": envs.pg.usuario || process.env.USER,
//     "password": envs.pg.senha || process.PASSWORD,
//     "database": envs.pg.db || process.env.DATABASE,
//     "host": process.env.HOST || envs.pg.host,
//     "port": envs.pg.porta || process.env.PORT
// });
//
// exports.execute = (query, params=[]) => {
//     return new Promise((resolve, reject) => {
//         pool.query(query, params, (error, result, fields) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(result);
//             }
//         });
//     })
// }
//
// exports.pool = pool;