// /api.js
// RESPONSAVEL POR GERENCIAR AS APIs
const express = require('express');
const cors = require('cors');
const os = require('os');
const pool = require('./config/database');

// Importa os roteadores de cada módulo
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');

// Importa o middleware de autenticação
// CORREÇÃO: O caminho agora aponta para a pasta correta 'middleware'
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
const port = 3000;

// Configurações globais do Express (middlewares)
app.use(cors()); // Permite requisições de outras origens (seu app)
app.use(express.json()); // Permite que a API entenda o formato JSON

// --- Definição das Rotas Principais ---

// As rotas de autenticação são PÚBLICAS (não precisam de token)
// O prefixo /api/auth será adicionado a todas as rotas em authRoutes.js
// Ex: /cadastro -> /api/auth/cadastro
app.use('/api/auth', authRoutes);

// As rotas de pets são PRIVADAS. Aplicamos o middleware `authenticateToken` aqui.
// Qualquer pedido para /api/pets/* primeiro passará pela verificação do token.
// Se o token for válido, o Express passa o controle para o roteador `petRoutes`.
app.use('/api/pets', authenticateToken, petRoutes);


// --- Função para Iniciar o Servidor ---
async function startServer() {
    try {
        // Testa a conexão com o banco antes de iniciar o servidor
        const connection = await pool.getConnection();
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
        connection.release(); // Libera a conexão de teste

        // Inicia o servidor para aceitar conexões da rede
        app.listen(port, '0.0.0.0', () => {
            console.log(`🚀 Servidor da API Petto rodando na porta ${port}.`);
            console.log('   Acessível na sua rede local. Use um dos IPs abaixo no seu app:');
            
            // Mostra os IPs locais disponíveis para facilitar a configuração no frontend
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
        process.exit(1); // Encerra o processo se não conseguir conectar ao DB
    }
}

// Inicia o processo
startServer();