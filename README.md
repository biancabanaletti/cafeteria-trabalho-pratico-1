Sistema de Gerenciamento de Cafeteria

Site da Cafeteria: https://cafeteria-frontend-bianca.onrender.com

API que conecta o frontend ao banco Neon: https://cafeteria-api-bianca.onrender.com

Testar API cardapio: https://cafeteria-api-bianca.onrender.com/cardapio

Testar API consumidores: https://cafeteria-api-bianca.onrender.com/consumidores

Testar API comandas: https://cafeteria-api-bianca.onrender.com/comandas

cd backend
npm install
npm start

cd frontend
npm install
npm start

GET: lista os itens do cardápio.
POST: cadastra um novo item.
PUT: altera um item existente.
DELETE: exclui um item.
pool.query(): executa uma consulta SQL no banco de dados.
try/catch: permite tratar erros que podem acontecer durante as operações.
$1, $2, $3 e $4: são parâmetros usados na consulta SQL para receber os valores de forma parametrizada.
req.body: recebe os dados enviados pelo frontend.
req.params: recebe o ID informado na URL.
res.json(): envia uma resposta em formato JSON.
