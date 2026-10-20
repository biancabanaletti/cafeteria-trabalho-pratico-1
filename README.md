Sistema de Gerenciamento de Cafeteria

O frontend é responsável pela interface e pelas requisições. Quem executa as consultas SQL e acessa o PostgreSQL é o backend.

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
useState: guarda informações da tela, como os campos e a lista de itens.
useEffect: carrega os itens quando a tela é aberta.
fetch: faz requisições para a API hospedada no Render.
async/await: permite trabalhar com operações assíncronas, como buscar dados.
JSON.stringify(): transforma o objeto em texto JSON para enviá-lo à API.
itens.map(): percorre a lista para montar as linhas da tabela.
onChange: atualiza o estado quando o usuário digita nos campos.
carregarConsumidores(): busca os dados na API.
salvarConsumidor(): cadastra ou altera um consumidor.
editarConsumidor(): preenche o formulário com os dados existentes.
excluirConsumidor(): remove um consumidor após a confirmação.
limparFormulario(): limpa os campos e encerra a edição.
consumidores.map(): monta a tabela com os consumidores recebidos da API.
carregarDados(): busca as comandas e os consumidores na API.
salvarComanda(): cadastra ou altera uma comanda.
editarComanda(): preenche o formulário com os dados da comanda selecionada.
excluirComanda(): exclui uma comanda após a confirmação.
consumidores.map(): cria as opções do campo de seleção de consumidores.
consumidores.find(): procura o consumidor relacionado a cada comanda para mostrar seu nome na tabela.
Number(): converte os valores de quantidade e ID para números.
String(...).slice(0, 10): transforma a data em texto e mantém somente os primeiros dez caracteres, no formato AAAA-MM-DD.
setTela(): altera a tela exibida.
voltarInicio(): retorna à página inicial.
import: importa os componentes, estilos e Bootstrap utilizados.
Cardapio, Consumidores e Comandas: são componentes separados, cada um responsável por uma parte do sistema.
Renderização condicional: os if e operadores ? : escolhem qual conteúdo será exibido conforme o valor de tela.
onClick: executa uma ação quando o usuário clica em um botão.
