const express = require('express');
const pool = require('../db');

const router = express.Router();

// listar consumidores
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query('select * from consumidores');
        res.json(resultado.rows);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao buscar consumidores' });
    }
});

// cadastrar consumidor
router.post('/', async (req, res) => {
    try {
        const { nome_completo, telefone } = req.body;

        const resultado = await pool.query(
            'insert into consumidores (nome_completo, telefone) values ($1, $2) returning *',
            [nome_completo, telefone]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao cadastrar consumidor' });
    }
});

// alterar consumidor
router.put('/:id_consumidor', async (req, res) => {
    try {
        const { id_consumidor } = req.params;
        const { nome_completo, telefone } = req.body;

        const resultado = await pool.query(
            'update consumidores set nome_completo = $1, telefone = $2 where id_consumidor = $3 returning *',
            [nome_completo, telefone, id_consumidor]
        );

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao alterar consumidor' });
    }
});

// excluir consumidor
router.delete('/:id_consumidor', async (req, res) => {
    try {
        const { id_consumidor } = req.params;

        await pool.query(
            'delete from consumidores where id_consumidor = $1',
            [id_consumidor]
        );

        res.json({ mensagem: 'consumidor excluido com sucesso' });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao excluir consumidor' });
    }
});

module.exports = router;