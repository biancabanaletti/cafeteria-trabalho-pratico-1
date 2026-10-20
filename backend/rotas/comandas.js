const express = require('express');
const pool = require('../db');

const router = express.Router();

// Listar todas as comandas cadastradas
router.get('/', async (req, res) => {
    try {
        // Busca todas as comandas no banco de dados
        const resultado = await pool.query('select * from comandas');

        // Retorna a lista de comandas em formato JSON
        res.json(resultado.rows);
    } catch (erro) {
        // Mostra o erro no terminal caso a consulta falhe
        console.log(erro);

        // Retorna o status 500, indicando erro no servidor
        res.status(500).json({ mensagem: 'erro ao buscar comandas' });
    }
});

// Cadastrar uma nova comanda
router.post('/', async (req, res) => {
    try {
        // Recebe os dados enviados pelo frontend
        const { data_abertura, quantidade_itens, id_consumidor } = req.body;

        // Insere a nova comanda no banco de dados
        // Os valores são enviados separadamente para evitar problemas na consulta SQL
        const resultado = await pool.query(
            'insert into comandas (data_abertura, quantidade_itens, id_consumidor) values ($1, $2, $3) returning *',
            [data_abertura, quantidade_itens, id_consumidor]
        );

        // Retorna a comanda cadastrada com status 201 (criado)
        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        // Mostra o erro no terminal caso o cadastro falhe
        console.log(erro);

        // Retorna uma mensagem de erro
        res.status(500).json({ mensagem: 'erro ao cadastrar comanda' });
    }
});

// Alterar uma comanda existente
router.put('/:id_comanda', async (req, res) => {
    try {
        // Obtém o ID da comanda pela URL
        const { id_comanda } = req.params;

        // Recebe os novos dados enviados pelo frontend
        const { data_abertura, quantidade_itens, id_consumidor } = req.body;

        // Atualiza os dados da comanda correspondente ao ID informado
        const resultado = await pool.query(
            'update comandas set data_abertura = $1, quantidade_itens = $2, id_consumidor = $3 where id_comanda = $4 returning *',
            [data_abertura, quantidade_itens, id_consumidor, id_comanda]
        );

        // Retorna a comanda atualizada em formato JSON
        res.json(resultado.rows[0]);
    } catch (erro) {
        // Mostra o erro no terminal caso a alteração falhe
        console.log(erro);

        // Retorna uma mensagem de erro
        res.status(500).json({ mensagem: 'erro ao alterar comanda' });
    }
});

// Excluir uma comanda
router.delete('/:id_comanda', async (req, res) => {
    try {
        // Obtém o ID da comanda pela URL
        const { id_comanda } = req.params;

        // Exclui do banco a comanda correspondente ao ID informado
        await pool.query(
            'delete from comandas where id_comanda = $1',
            [id_comanda]
        );

        // Confirma que a exclusão foi realizada
        res.json({ mensagem: 'comanda excluida com sucesso' });
    } catch (erro) {
        // Mostra o erro no terminal caso a exclusão falhe
        console.log(erro);

        // Retorna uma mensagem de erro
        res.status(500).json({ mensagem: 'erro ao excluir comanda' });
    }
});

// Exporta as rotas para serem utilizadas pelo servidor
module.exports = router;
