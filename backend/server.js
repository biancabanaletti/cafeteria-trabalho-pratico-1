const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const cardapioRotas = require('./rotas/cardapio');
const consumidoresRotas = require('./rotas/consumidores');
const comandasRotas = require('./rotas/comandas');

app.use('/cardapio', cardapioRotas);
app.use('/consumidores', consumidoresRotas);
app.use('/comandas', comandasRotas);

app.get('/', (req, res) => {
    res.json({ mensagem: 'api da cafeteria funcionando!' });
});

app.listen(3001, () => {
    console.log('servidor rodando na porta 3001');
});