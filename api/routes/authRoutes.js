// /routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database'); 
const router = express.Router();

const JWT_SECRET = 'aSenhaMaisSeguraQueExisteEaMaisBasica';

// Rota: POST /api/auth/cadastro
// O prefixo '/api/auth' é definido no arquivo principal api.js
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
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

// Rota: POST /api/auth/login
router.post('/login', async (req, res) => {
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
        const tokenPayload = { id: user.id, nome: user.nome, email: user.email };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

module.exports = router;
