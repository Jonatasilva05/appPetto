// /routes/petRoutes.js
const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Nota: O middleware de autenticação é aplicado a todas estas rotas
// no arquivo principal api.js, então não precisamos chamá-lo aqui.
// Todas as rotas aqui dentro já são seguras e protegidas.

// Rota: GET /api/pets/
// Busca todos os pets do usuário logado
router.get('/', async (req, res) => {
    try {
        const userId = req.user.id; // O ID vem do token verificado pelo middleware
        const [pets] = await pool.execute('SELECT id_pet, nome, raca, foto_url FROM pets WHERE id_usuario = ?', [userId]);
        res.status(200).json(pets);
    } catch (error) {
        console.error('Erro ao buscar pets:', error);
        res.status(500).json({ message: 'Erro ao buscar dados dos pets.' });
    }
});

// Rota: POST /api/pets/
// Cadastra um novo pet para o usuário logado
router.post('/', async (req, res) => {
    const { nome, especie, raca, idade } = req.body;
    const id_usuario = req.user.id;

    if (!nome || !especie || !raca || idade === undefined) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios: nome, espécie, raça e idade.' });
    }

    try {
        const sql = 'INSERT INTO pets (nome, id_usuario, especie, raca, idade) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.execute(sql, [nome, id_usuario, especie, raca, idade]);
        
        res.status(201).json({ 
            message: 'Pet cadastrado com sucesso!',
            petId: result.insertId
        });
    } catch (error) {
        console.error('Erro ao cadastrar pet:', error);
        res.status(500).json({ message: 'Erro interno ao tentar cadastrar o pet.' });
    }
});

// Rota: DELETE /api/pets/:petId
// Deleta um pet específico do usuário logado
router.delete('/:petId', async (req, res) => {
    try {
        const userId = req.user.id;
        const { petId } = req.params;
        // É uma boa prática deletar dados dependentes primeiro (se houver)
        await pool.execute('DELETE FROM vacinas WHERE id_pet = ?', [petId]);
        
        const [result] = await pool.execute('DELETE FROM pets WHERE id_pet = ? AND id_usuario = ?', [petId, userId]);
        if (result.affectedRows === 0) {
            // Se nenhuma linha foi afetada, o pet não existe ou não pertence ao usuário
            return res.status(404).json({ message: 'Pet não encontrado ou você não tem permissão para deletá-lo.' });
        }
        res.status(200).json({ message: 'Pet deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar pet:', error);
        res.status(500).json({ message: 'Erro interno ao tentar deletar o pet.' });
    }
});

module.exports = router;
