const express = require('express');
const pool = require('../db');

const router = express.Router();

// listar cardapio
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query('select * from cardapio');
        res.json(resultado.rows);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao buscar cardapio' });
    }
});

// cadastrar item no cardapio
router.post('/', async (req, res) => {
    try {
        const { nome_item, preco_unitario, tipo_item } = req.body;

        const resultado = await pool.query(
            'insert into cardapio (nome_item, preco_unitario, tipo_item) values ($1, $2, $3) returning *',
            [nome_item, preco_unitario, tipo_item]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao cadastrar item' });
    }
});

// alterar item do cardapio
router.put('/:id_item', async (req, res) => {
    try {
        const { id_item } = req.params;
        const { nome_item, preco_unitario, tipo_item } = req.body;

        const resultado = await pool.query(
            'update cardapio set nome_item = $1, preco_unitario = $2, tipo_item = $3 where id_item = $4 returning *',
            [nome_item, preco_unitario, tipo_item, id_item]
        );

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao alterar item' });
    }
});

// excluir item do cardapio
router.delete('/:id_item', async (req, res) => {
    try {
        const { id_item } = req.params;

        await pool.query(
            'delete from cardapio where id_item = $1',
            [id_item]
        );

        res.json({ mensagem: 'item excluido com sucesso' });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao excluir item' });
    }
});

module.exports = router;