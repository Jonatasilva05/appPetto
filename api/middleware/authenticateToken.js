// /middleware/authenticateToken.js

// RESPONSAVEL PELA AUTENTICAÇÃO DOS TOKENS DE SEGURANÇA

const jwt = require('jsonwebtoken');

// CHAVE SECRETA PARA VALIDAÇÃO DOS TOKENS
const JWT_SECRET = 'aSenhaMaisSeguraQueExisteEaMaisBasica';

const authenticateToken = (req, res, next) => {
    // PEGA O TOKEN DE AUTENTICAÇÃO
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // CASO NAO TENHA ACESSO ELE NEGA A CONEXAO
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // FAZ A VERIFICAÇÃO SE O TOKEN É VALIDO OU O TEMPO DELE EXPIROU
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // SE O TEMPO FOR INVALIDO (ASSINATURA ERRADA, TEMPO EXPIRADO) ELE NEGA A CONEXAO
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
        
        // SE FOR TOKEN CORRETO  ELE PERMITE CONECTAR COM AS ROTAS
        req.user = user;
        next(); // PASSA O CONTROLE PARA A PROXIMA ROTA
    });
};

module.exports = authenticateToken;