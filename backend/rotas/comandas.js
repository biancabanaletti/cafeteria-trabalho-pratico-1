const express = require('express');
const pool = require('../db');

const router = express.Router();

// listar comandas
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query('select * from comandas');
        res.json(resultado.rows);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao buscar comandas' });
    }
});

// cadastrar comanda
router.post('/', async (req, res) => {
    try {
        const { data_abertura, quantidade_itens, id_consumidor } = req.body;

        const resultado = await pool.query(
            'insert into comandas (data_abertura, quantidade_itens, id_consumidor) values ($1, $2, $3) returning *',
            [data_abertura, quantidade_itens, id_consumidor]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao cadastrar comanda' });
    }
});

// alterar comanda
router.put('/:id_comanda', async (req, res) => {
    try {
        const { id_comanda } = req.params;
        const { data_abertura, quantidade_itens, id_consumidor } = req.body;

        const resultado = await pool.query(
            'update comandas set data_abertura = $1, quantidade_itens = $2, id_consumidor = $3 where id_comanda = $4 returning *',
            [data_abertura, quantidade_itens, id_consumidor, id_comanda]
        );

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao alterar comanda' });
    }
});

// excluir comanda
router.delete('/:id_comanda', async (req, res) => {
    try {
        const { id_comanda } = req.params;

        await pool.query(
            'delete from comandas where id_comanda = $1',
            [id_comanda]
        );

        res.json({ mensagem: 'comanda excluida com sucesso' });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao excluir comanda' });
    }
});

module.exports = router;