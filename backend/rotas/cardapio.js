const express = require('express');
const pool = require('../db');

// Cria o router para as rotas do cardápio
const router = express.Router();

// Lista todos os itens cadastrados no cardápio
router.get('/', async (req, res) => {
    try {
        // Busca todos os registros da tabela cardapio no banco
        const resultado = await pool.query('select * from cardapio');

        // Retorna os itens encontrados em formato JSON
        res.json(resultado.rows);
    } catch (erro) {
        // Mostra o erro no terminal caso a consulta falhe
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao buscar cardapio' });
    }
});

// Cadastra um novo item no cardápio
router.post('/', async (req, res) => {
    try {
        // Pega os dados enviados pelo frontend
        const { nome_item, preco_unitario, tipo_item } = req.body;

        // Insere o novo item no banco usando os dados recebidos
        const resultado = await pool.query(
            'insert into cardapio (nome_item, preco_unitario, tipo_item) values ($1, $2, $3) returning *',
            [nome_item, preco_unitario, tipo_item]
        );

        // Retorna o item cadastrado e informa que a criação deu certo
        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        // Mostra o erro no terminal caso o cadastro falhe
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao cadastrar item' });
    }
});

// Altera os dados de um item do cardápio
router.put('/:id_item', async (req, res) => {
    try {
        // Pega o identificador do item enviado pela URL
        const { id_item } = req.params;

        // Pega os novos dados enviados pelo frontend
        const { nome_item, preco_unitario, tipo_item } = req.body;

        // Atualiza o item correspondente ao identificador informado
        const resultado = await pool.query(
            'update cardapio set nome_item = $1, preco_unitario = $2, tipo_item = $3 where id_item = $4 returning *',
            [nome_item, preco_unitario, tipo_item, id_item]
        );

        // Retorna os dados do item após a alteração
        res.json(resultado.rows[0]);
    } catch (erro) {
        // Mostra o erro no terminal caso a alteração falhe
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao alterar item' });
    }
});

// Exclui um item do cardápio
router.delete('/:id_item', async (req, res) => {
    try {
        // Pega o identificador do item que será excluído
        const { id_item } = req.params;

        // Remove do banco o item com o identificador informado
        await pool.query(
            'delete from cardapio where id_item = $1',
            [id_item]
        );

        // Informa que a exclusão foi realizada
        res.json({ mensagem: 'item excluido com sucesso' });
    } catch (erro) {
        // Mostra o erro no terminal caso a exclusão falhe
        console.log(erro);
        res.status(500).json({ mensagem: 'erro ao excluir item' });
    }
});

// Exporta as rotas para serem utilizadas pelo servidor
module.exports = router;
