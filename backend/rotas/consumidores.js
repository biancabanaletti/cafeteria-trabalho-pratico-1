const express = require('express');
const pool = require('../db');

const router = express.Router();

// Listar todos os consumidores cadastrados
router.get('/', async (req, res) => {
    try {
        // Busca todos os consumidores no banco de dados
        const resultado = await pool.query('select * from consumidores');

        // Retorna a lista de consumidores em formato JSON
        res.json(resultado.rows);
    } catch (erro) {
        // Mostra o erro no terminal caso a consulta falhe
        console.log(erro);

        // Retorna o status 500, indicando erro no servidor
        res.status(500).json({ mensagem: 'erro ao buscar consumidores' });
    }
});

// Cadastrar um novo consumidor
router.post('/', async (req, res) => {
    try {
        // Recebe o nome e o telefone enviados pelo frontend
        const { nome_completo, telefone } = req.body;

        // Insere o novo consumidor no banco de dados
        const resultado = await pool.query(
            'insert into consumidores (nome_completo, telefone) values ($1, $2) returning *',
            [nome_completo, telefone]
        );

        // Retorna o consumidor cadastrado com status 201 (criado)
        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        // Mostra o erro no terminal caso o cadastro falhe
        console.log(erro);

        // Retorna uma mensagem de erro
        res.status(500).json({ mensagem: 'erro ao cadastrar consumidor' });
    }
});

// Alterar um consumidor existente
router.put('/:id_consumidor', async (req, res) => {
    try {
        // Obtém o ID do consumidor pela URL
        const { id_consumidor } = req.params;

        // Recebe os novos dados enviados pelo frontend
        const { nome_completo, telefone } = req.body;

        // Atualiza o nome e o telefone do consumidor informado
        const resultado = await pool.query(
            'update consumidores set nome_completo = $1, telefone = $2 where id_consumidor = $3 returning *',
            [nome_completo, telefone, id_consumidor]
        );

        // Retorna os dados atualizados em formato JSON
        res.json(resultado.rows[0]);
    } catch (erro) {
        // Mostra o erro no terminal caso a alteração falhe
        console.log(erro);

        // Retorna uma mensagem de erro
        res.status(500).json({ mensagem: 'erro ao alterar consumidor' });
    }
});

// Excluir um consumidor
router.delete('/:id_consumidor', async (req, res) => {
    try {
        // Obtém o ID do consumidor pela URL
        const { id_consumidor } = req.params;

        // Exclui do banco o consumidor correspondente ao ID informado
        await pool.query(
            'delete from consumidores where id_consumidor = $1',
            [id_consumidor]
        );

        // Confirma que a exclusão foi realizada
        res.json({ mensagem: 'consumidor excluido com sucesso' });
    } catch (erro) {
        // Mostra o erro no terminal caso a exclusão falhe
        console.log(erro);

        // Retorna uma mensagem de erro
        res.status(500).json({ mensagem: 'erro ao excluir consumidor' });
    }
});

// Exporta as rotas para serem utilizadas pelo servidor
module.exports = router;