Sistema de Gerenciamento de Cafeteria

O sistema permite gerenciar o cardápio, os consumidores e as comandas de uma cafeteria.

O frontend é responsável pela interface e pelas requisições. O backend recebe essas requisições, executa as consultas SQL e acessa o banco de dados PostgreSQL hospedado no Neon.

Site da Cafeteria: https://cafeteria-frontend-bianca.onrender.com

-API que conecta o frontend ao banco Neon: https://cafeteria-api-bianca.onrender.com

-Testar API cardapio: https://cafeteria-api-bianca.onrender.com/cardapio

-Testar API consumidores: https://cafeteria-api-bianca.onrender.com/consumidores

-Testar API comandas: https://cafeteria-api-bianca.onrender.com/comandas

Backend:
-cd backend
-npm install
-npm start

Frontend:
-cd frontend
-npm install
-npm start

Métodos HTTP

-GET: lista os dados cadastrados.

-POST: cadastra um novo registro.

-PUT: altera um registro existente.

-DELETE: exclui um registro.

Backend

-pool.query(): executa uma consulta SQL no banco de dados.

-try/catch: permite tratar erros que podem acontecer durante as operações.

-$1, $2, $3 e $4: são parâmetros utilizados nas consultas SQL para receber valores de forma parametrizada.

-req.body: recebe os dados enviados pelo frontend.

-req.params: recebe os parâmetros informados na URL, como o ID do registro.

-res.json(): envia uma resposta em formato JSON.

-dotenv: carrega as configurações guardadas no arquivo .env.

-pg: é a biblioteca que permite ao Node.js se conectar ao PostgreSQL.

-Pool: gerencia as conexões utilizadas para executar consultas no banco.

-DATABASE_URL: contém o endereço de conexão com o banco de dados e fica configurada nas variáveis de ambiente.

-ssl: configura a conexão segura com o banco hospedado na nuvem.

-module.exports = pool: permite que outros arquivos utilizem a conexão com o banco.

-Express: facilita a criação do servidor e das rotas da API.

-CORS: permite que o frontend, hospedado em outro endereço, faça requisições para o backend.

-express.json(): permite que o servidor interprete os dados recebidos em JSON.

-require(): importa módulos e arquivos de rotas.

-app.use(): associa as rotas aos endereços da API e configura middlewares.

-app.get('/'): disponibiliza uma rota inicial para verificar se a API está funcionando.

-app.listen(): inicia o servidor para receber requisições.

Frontend

-useState: guarda informações da tela, como os campos do formulário e a lista de itens.

-useEffect: executa ações quando o componente é carregado ou quando suas dependências mudam.

-fetch: faz requisições para a API.

-async/await: permite trabalhar com operações assíncronas, como buscar dados.

-JSON.stringify(): transforma um objeto JavaScript em texto JSON para enviá-lo à API.

-map(): percorre uma lista para montar as linhas de uma tabela ou as opções de um campo.

-onChange: executa uma ação quando o valor de um campo é alterado.

-setTela(): altera a tela exibida.

-voltarInicio(): retorna à página inicial.

-import: importa componentes, estilos e bibliotecas utilizados.

-Cardapio, Consumidores e Comandas: são componentes separados, cada um responsável por uma parte do sistema.

-Renderização condicional: escolhe qual conteúdo será exibido conforme o valor da variável tela.

-onClick: executa uma ação quando o usuário clica em um botão.

Funções do sistema

Cardápio

-carregarItens(): busca os itens cadastrados na API.

-salvarItem(): cadastra ou altera um item.

-editarItem(): preenche o formulário com os dados de um item existente.

-excluirItem(): exclui um item após a confirmação.

-limparFormulario(): limpa os campos do formulário.

-itens.map(): percorre a lista de itens para montar a tabela.

Consumidores

-carregarConsumidores(): busca os consumidores na API.

-salvarConsumidor(): cadastra ou altera um consumidor.

-editarConsumidor(): preenche o formulário com os dados existentes.

-excluirConsumidor(): remove um consumidor após a confirmação.

-limparFormulario(): limpa os campos e encerra a edição.

-consumidores.map(): monta a tabela com os consumidores recebidos da API.

Comandas

-carregarDados(): busca as comandas e os consumidores na API.

-salvarComanda(): cadastra ou altera uma comanda.

-editarComanda(): preenche o formulário com os dados da comanda selecionada.

-excluirComanda(): exclui uma comanda após a confirmação.

-consumidores.map(): cria as opções do campo de seleção de consumidores.

-consumidores.find(): procura o consumidor relacionado a cada comanda para mostrar seu nome na tabela.

-Number(): converte valores, como quantidade e ID, para números.

-String(...).slice(0, 10): transforma a data em texto e mantém os primeiros dez caracteres, no formato AAAA-MM-DD.

Tecnologias utilizadas

-JavaScript

-React

-Node.js

-Express

-PostgreSQL

-Neon

-Render

-Bootstrap

-Git e GitHub
