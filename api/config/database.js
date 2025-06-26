// /config/database.js

// ARQUIVO ESPECIFICO PARA A CONEXÃO BANCO DE DADOS
const mysql = require('mysql2/promise');

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'petto'
};

// RESPONSAVEL POR CRIAR E EXPORTAR CONEXÕES
const pool = mysql.createPool(dbConfig);

// EXPORTAR COMO ROTAS PARA PODER SER USADO POR OUTROS ARQUIVOS
module.exports = pool;