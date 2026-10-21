import { useState, useEffect } from 'react';

function Consumidores() {
  // Guarda a lista de consumidores e os dados do formulário
  const [consumidores, setConsumidores] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  // Guarda o ID do consumidor que está sendo editado
  const [idEditar, setIdEditar] = useState(null);

  // Busca os consumidores cadastrados na API
  const carregarConsumidores = async () => {
    try {
      const resposta = await fetch('https://cafeteria-api-bianca.onrender.com/consumidores');
      const dados = await resposta.json();

      // Atualiza a lista exibida na tela
      setConsumidores(dados);
    } catch (erro) {
      alert('Erro ao carregar consumidores.');
    }
  };

  // Carrega os consumidores automaticamente quando a tela é aberta
  useEffect(() => {
    carregarConsumidores();
  }, []);

  // Cadastra um consumidor ou salva as alterações de um existente
  const salvarConsumidor = async (e) => {
    // Impede que a página recarregue ao enviar o formulário
    e.preventDefault();

    // Organiza os dados que serão enviados para a API
    const consumidor = {
      nome_completo: nome,
      telefone: telefone
    };

    try {
      // Se existe um ID, utiliza a rota de alteração; caso contrário, a de cadastro
      const url = idEditar
        ? `https://cafeteria-api-bianca.onrender.com/consumidores/${idEditar}`
        : 'https://cafeteria-api-bianca.onrender.com/consumidores';

      // Envia os dados usando PUT para alterar ou POST para cadastrar
      const resposta = await fetch(url, {
        method: idEditar ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(consumidor)
      });

      // Verifica se a API retornou uma resposta de sucesso
      if (!resposta.ok) {
        alert('Não foi possível salvar o consumidor.');
        return;
      }

      // Limpa o formulário e atualiza a lista
      limparFormulario();
      carregarConsumidores();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  // Preenche o formulário com os dados do consumidor escolhido
  const editarConsumidor = (consumidor) => {
    setIdEditar(consumidor.id_consumidor);
    setNome(consumidor.nome_completo);

    // Se o telefone estiver vazio ou nulo, deixa o campo em branco
    setTelefone(consumidor.telefone || '');
  };

  // Exclui um consumidor pelo ID
  const excluirConsumidor = async (id) => {
    // Pede confirmação antes de excluir
    if (!window.confirm('Deseja excluir este consumidor?')) {
      return;
    }

    try {
      // Envia uma requisição DELETE para a API
      const resposta = await fetch(
        `https://cafeteria-api-bianca.onrender.com/consumidores/${id}`,
        { method: 'DELETE' }
      );

      // Verifica se a exclusão foi realizada
      if (!resposta.ok) {
        alert('Não foi possível excluir o consumidor.');
        return;
      }

      // Atualiza a lista após a exclusão
      carregarConsumidores();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  // Limpa os campos e encerra o modo de edição
  const limparFormulario = () => {
    setIdEditar(null);
    setNome('');
    setTelefone('');
  };

  return (
    <div>
      <h2 className="mb-4">Gerenciar consumidores</h2>

      {/* Formulário para cadastrar ou alterar consumidores */}
      <form onSubmit={salvarConsumidor} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">Nome completo:</label>
          <input
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Telefone:</label>
          <input
            type="tel"
            className="form-control"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div>
          {/* O texto do botão muda conforme o modo de cadastro ou edição */}
          <button className="btn botao me-2" type="submit">
            {idEditar ? 'Salvar alterações' : 'Cadastrar consumidor'}
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

      {/* Tabela que exibe os consumidores cadastrados */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome completo</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {/* Percorre a lista e cria uma linha para cada consumidor */}
            {consumidores.map((consumidor) => (
              <tr key={consumidor.id_consumidor}>
                <td>{consumidor.id_consumidor}</td>
                <td>{consumidor.nome_completo}</td>

                {/* Exibe um traço caso o telefone não esteja preenchido */}
                <td>{consumidor.telefone || '-'}</td>
                <td>
                  {/* Carrega os dados do consumidor no formulário */}
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editarConsumidor(consumidor)}
                  >
                    Editar
                  </button>

                  {/* Exclui o consumidor selecionado */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      excluirConsumidor(consumidor.id_consumidor)
                    }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

            {/* Exibe uma mensagem quando não há consumidores cadastrados */}
            {consumidores.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  Nenhum consumidor cadastrado.
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
export default Consumidores;