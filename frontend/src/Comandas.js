import { useState, useEffect } from 'react';

function Comandas() {
  // Guarda a lista de comandas e de consumidores
  const [comandas, setComandas] = useState([]);
  const [consumidores, setConsumidores] = useState([]);

  // Guarda os valores preenchidos no formulário
  const [data, setData] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [idConsumidor, setIdConsumidor] = useState('');

  // Guarda o ID da comanda que está sendo editada
  const [idEditar, setIdEditar] = useState(null);

  // Busca as comandas e os consumidores na API
  const carregarDados = async () => {
    try {
      // Busca todas as comandas cadastradas
      const respostaComandas = await fetch('https://cafeteria-api-bianca.onrender.com/comandas');
      const dadosComandas = await respostaComandas.json();
      setComandas(dadosComandas);

      // Busca os consumidores para preencher o campo de seleção
      const respostaConsumidores = await fetch(
        'https://cafeteria-api-bianca.onrender.com/consumidores'
      );
      const dadosConsumidores = await respostaConsumidores.json();
      setConsumidores(dadosConsumidores);
    } catch (erro) {
      alert('Erro ao carregar os dados.');
    }
  };

  // Carrega os dados automaticamente quando a tela é aberta
  useEffect(() => {
    carregarDados();
  }, []);

  // Cadastra uma comanda ou salva as alterações de uma existente
  const salvarComanda = async (e) => {
    // Impede que a página recarregue ao enviar o formulário
    e.preventDefault();

    // Organiza os dados que serão enviados para a API
    const comanda = {
      data_abertura: data,
      quantidade_itens: Number(quantidade),
      id_consumidor: Number(idConsumidor)
    };

    try {
      // Se existe um ID, utiliza a rota de alteração; caso contrário, a de cadastro
      const url = idEditar
        ? `https://cafeteria-api-bianca.onrender.com/comandas/${idEditar}`
        : 'https://cafeteria-api-bianca.onrender.com/comandas';

      // Envia os dados usando PUT para alterar ou POST para cadastrar
      const resposta = await fetch(url, {
        method: idEditar ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comanda)
      });

      // Verifica se a API retornou uma resposta de sucesso
      if (!resposta.ok) {
        alert('Não foi possível salvar a comanda.');
        return;
      }

      // Limpa o formulário e atualiza as listas
      limparFormulario();
      carregarDados();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  // Preenche o formulário com os dados da comanda escolhida
  const editarComanda = (comanda) => {
    setIdEditar(comanda.id_comanda);

    // Formata a data para preencher corretamente o campo do tipo date
    setData(String(comanda.data_abertura).slice(0, 10));

    setQuantidade(comanda.quantidade_itens);

    // Converte o ID para texto para preencher o campo de seleção
    setIdConsumidor(String(comanda.id_consumidor));
  };

  // Exclui uma comanda pelo ID
  const excluirComanda = async (id) => {
    // Pede confirmação antes de excluir
    if (!window.confirm('Deseja excluir esta comanda?')) {
      return;
    }

    try {
      // Envia uma requisição DELETE para a API
      const resposta = await fetch(
        `https://cafeteria-api-bianca.onrender.com/comandas/${id}`,
        { method: 'DELETE' }
      );

      // Verifica se a exclusão foi realizada
      if (!resposta.ok) {
        alert('Não foi possível excluir a comanda.');
        return;
      }

      // Atualiza as listas após a exclusão
      carregarDados();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  // Limpa os campos e encerra o modo de edição
  const limparFormulario = () => {
    setIdEditar(null);
    setData('');
    setQuantidade('');
    setIdConsumidor('');
  };

  return (
    <div>
      <h2 className="mb-4">Gerenciar comandas</h2>

      {/* Formulário para cadastrar ou alterar comandas */}
      <form onSubmit={salvarComanda} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">Data de abertura:</label>
          <input
            type="date"
            className="form-control"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantidade de itens:</label>
          <input
            type="number"
            min="1"
            className="form-control"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Consumidor:</label>
          <select
            className="form-select"
            value={idConsumidor}
            onChange={(e) => setIdConsumidor(e.target.value)}
            required
          >
            <option value="">Selecione um consumidor</option>

            {/* Cria uma opção para cada consumidor cadastrado */}
            {consumidores.map((consumidor) => (
              <option
                key={consumidor.id_consumidor}
                value={consumidor.id_consumidor}
              >
                {consumidor.nome_completo}
              </option>
            ))}
          </select>
        </div>

        <div>
          {/* O texto do botão muda conforme o modo de cadastro ou edição */}
          <button className="btn botao me-2" type="submit">
            {idEditar ? 'Salvar alterações' : 'Cadastrar comanda'}
          </button>

          {/* Mostra o botão Cancelar somente durante a edição */}
          {idEditar && (
            <button
              className="btn btn-secondary"
              type="button"
              onClick={limparFormulario}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabela que exibe as comandas cadastradas */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Data de abertura</th>
              <th>Quantidade de itens</th>
              <th>Consumidor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {/* Percorre as comandas para montar as linhas da tabela */}
            {comandas.map((comanda) => {
              // Procura o consumidor associado à comanda pelo ID
              const consumidor = consumidores.find(
                (c) => c.id_consumidor === comanda.id_consumidor
              );

              return (
                <tr key={comanda.id_comanda}>
                  <td>{comanda.id_comanda}</td>
                  <td>
                    {String(comanda.data_abertura).slice(0, 10)}
                  </td>
                  <td>{comanda.quantidade_itens}</td>
                  <td>
                    {/* Exibe o nome do consumidor ou seu ID caso não seja encontrado */}
                    {consumidor
                      ? consumidor.nome_completo
                      : `ID ${comanda.id_consumidor}`}
                  </td>
                  <td>
                    {/* Carrega os dados da comanda no formulário */}
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => editarComanda(comanda)}
                    >
                      Editar
                    </button>

                    {/* Exclui a comanda selecionada */}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => excluirComanda(comanda.id_comanda)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Exibe uma mensagem quando não há comandas cadastradas */}
            {comandas.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  Nenhuma comanda cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Permite que o componente seja utilizado em outros arquivos
export default Comandas;