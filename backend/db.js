// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa o Pool, usado para gerenciar conexões com o PostgreSQL
const { Pool } = require('pg');

// Cria a conexão com o banco de dados
const pool = new Pool({
    // Lê o endereço de conexão armazenado na variável DATABASE_URL
    connectionString: process.env.DATABASE_URL,

    // Configura o SSL para a conexão com o banco na nuvem
    ssl: {
        rejectUnauthorized: false
    }
});

// Exporta a conexão para ser utilizada pelas rotas
module.exports = pool;
