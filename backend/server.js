const express = require('express');
const cors = require('cors');

// Cria a aplicação usando Express
const app = express();

// Permite que o frontend faça requisições para a API
app.use(cors());

// Permite que o servidor receba dados no formato JSON
app.use(express.json());

// Importa as rotas de cada parte do sistema
const cardapioRotas = require('./rotas/cardapio');
const consumidoresRotas = require('./rotas/consumidores');
const comandasRotas = require('./rotas/comandas');

// Define os endereços utilizados para acessar cada conjunto de rotas
app.use('/cardapio', cardapioRotas);
app.use('/consumidores', consumidoresRotas);
app.use('/comandas', comandasRotas);

// Rota inicial para verificar se a API está funcionando
app.get('/', (req, res) => {
    res.json({ mensagem: 'api da cafeteria funcionando!' });
});

// Inicia o servidor na porta 3001
app.listen(3001, () => {
    console.log('servidor rodando na porta 3001');
});
