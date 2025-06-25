/*
 * Arquivo: api.js
 * Versão Corrigida: Agora o servidor aceita conexões de outros dispositivos na rede local.
 */

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const os = require('os'); // Importado para encontrar o IP local

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

// --- Middleware de Autenticação (sem alterações) ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
        req.user = user; 
        next();
    });
};

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
        const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

app.get('/api/pets', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const [pets] = await pool.execute('SELECT id_pet, nome, raca, foto_url FROM pets WHERE id_usuario = ?', [userId]);
        res.status(200).json(pets);
    } catch (error) {
        console.error('Erro ao buscar pets:', error);
        res.status(500).json({ message: 'Erro ao buscar dados dos pets.' });
    }
});

app.delete('/api/pets/:petId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { petId } = req.params;
        await pool.execute('DELETE FROM vacinas WHERE id_pet = ?', [petId]);
        const [result] = await pool.execute('DELETE FROM pets WHERE id_pet = ? AND id_usuario = ?', [petId, userId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pet não encontrado ou você não tem permissão para deletá-lo.' });
        }
        res.status(200).json({ message: 'Pet deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar pet:', error);
        res.status(500).json({ message: 'Erro interno ao tentar deletar o pet.' });
    }
});


// --- Função para iniciar o servidor ---
async function startServer() {
    try {
        await pool.getConnection();
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
        
        // **A CORREÇÃO ESTÁ AQUI**
        // O servidor agora escuta em '0.0.0.0', aceitando conexões de qualquer IP na sua rede local.
        app.listen(port, '0.0.0.0', () => {
            console.log(`🚀 Servidor da API Petto rodando na porta ${port}.`);
            console.log('   Acessível na sua rede local. Use o IP abaixo no seu app:');
            
            // Encontra e exibe o IP local para facilitar a configuração no app
            const interfaces = os.networkInterfaces();
            Object.keys(interfaces).forEach(ifaceName => {
                interfaces[ifaceName].forEach(iface => {
                    if (iface.family === 'IPv4' && !iface.internal) {
                        console.log(`   ➡️  http://${iface.address}:${port}`);
                    }
                });
            });
        });
    } catch (error) {
        console.error('❌ ERRO FATAL: Não foi possível conectar ao banco de dados.', error.message);
        process.exit(1);
    }
}

startServer();
