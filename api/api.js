/*
 * Arquivo: api.js
 * Versão Melhorada: Agora testa a conexão com o banco de dados na inicialização
 * para garantir que tudo está funcionando antes de iniciar o servidor.
 */

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// --- Configuração do Banco de Dados (sem alterações) ---
const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'petto'
};

const JWT_SECRET = 'sua-chave-secreta-super-segura-e-longa-para-proteger-os-tokens';
const pool = mysql.createPool(dbConfig);


// --- Rotas da API (sem alterações) ---
app.post('/api/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
    }
    try {
        const [users] = await pool.execute('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(409).json({ message: 'Este e-mail já está em uso.' });
        }
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);
        await pool.execute('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senhaHash]);
        res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }
    try {
        const [users] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = users[0];
        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        }
        const token = jwt.sign({ id: user.id, email: user.email, nome: user.nome }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});


// --- Função para iniciar o servidor ---
async function startServer() {
    try {
        // 1. Tenta pegar uma conexão do pool para testar
        const connection = await pool.getConnection();
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
        // Libera a conexão de volta para o pool
        connection.release();

        // 2. Se a conexão funcionou, inicia o servidor Express
        app.listen(port, () => {
            console.log(`🚀 Servidor da API Petto rodando em http://localhost:${port}`);
            console.log('   (Pressione Ctrl+C para parar o servidor)');
        });

    } catch (error) {
        // 3. Se a conexão falhou, mostra um erro claro e encerra
        console.error('❌ ERRO FATAL: Não foi possível conectar ao banco de dados.');
        console.error('   Por favor, verifique os seguintes pontos:');
        console.error('   1. O seu serviço MySQL (XAMPP, WAMP, etc.) está rodando?');
        console.error('   2. As credenciais (usuário, senha, nome do banco) no arquivo api.js estão corretas?');
        console.error('\nDetalhes do erro técnico:', error.message);
        process.exit(1); // Encerra o processo com um código de erro
    }
}

// Inicia todo o processo
startServer();
