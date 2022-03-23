const express = require("express");             //Importa o express para ser usado no projeto
const app = express();                          //Cria uma instancia do express para ser usado no app
const morgan = require("morgan");               //Importa a biblioteca morga para dar um callback

//importandos as rotas
const rotaHome = require('./routes/home');

//Monitora a execucao das rotas para dar um callback (log)
app.use(morgan('dev'));

//Permiti apenas dados simples, como json na entrada do body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Permiti somente algumas informaçoes de cabeçalho
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method == 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, GET, PATCH, DELETE'
        );
        return res.status(200).send({});
    }

    next();
});

//Acionando as rotas
app.use('/', rotaHome);


app.use((req, res, next) => {
    const erro = new Error('Não encontrado! Você se perdeu! :(');
    erro.status = 404;
    next(erro);
});
app.use((erro, req, res, next) => {
    res.status(erro.status || 500);
    return res.send({
        erro: {
            mensagem: erro.mensage
        }
    });
});

//Exportando o arquivo para ser usado pelo servidor
module.exports = app;