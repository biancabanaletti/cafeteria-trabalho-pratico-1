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
dotenv: carrega as configurações guardadas no arquivo .env.
pg: é a biblioteca que permite ao Node.js se conectar ao PostgreSQL.
Pool: gerencia as conexões utilizadas para executar consultas no banco.
DATABASE_URL: contém o endereço de conexão com o banco de dados. No seu projeto, ele fica configurado nas variáveis de ambiente.
ssl: configura a conexão segura com o banco hospedado na nuvem.
module.exports = pool: permite que os outros arquivos, como as rotas, utilizem essa conexão.
Express: facilita a criação do servidor e das rotas da API.
CORS: permite que o frontend, hospedado em outro endereço, faça requisições para o backend.
express.json(): permite que o servidor interprete dados recebidos em JSON.
require(): importa os arquivos de rotas.
app.use(): associa cada conjunto de rotas a um endereço da API.
app.get('/'): disponibiliza uma rota inicial para verificar se a API está funcionando.
app.listen(): inicia o servidor na porta 3001.
