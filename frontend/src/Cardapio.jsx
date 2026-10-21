import { useState, useEffect } from 'react';

function Cardapio() {
  // Guarda a lista de itens e os dados preenchidos no formulário
  const [itens, setItens] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [tipo, setTipo] = useState('');

  // Guarda o ID do item que está sendo editado
  const [idEditar, setIdEditar] = useState(null);

  // Busca os itens do cardápio na API
  const carregarItens = async () => {
    try {
      const resposta = await fetch('https://cafeteria-api-bianca.onrender.com/cardapio');
      const dados = await resposta.json();

      // Atualiza a lista de itens exibida na tela
      setItens(dados);
    } catch (erro) {
      alert('Erro ao carregar o cardápio.');
    }
  };

  // Carrega os itens automaticamente quando a tela é aberta
  useEffect(() => {
    carregarItens();
  }, []);

  // Cadastra um item novo ou salva as alterações de um item existente
  const salvarItem = async (e) => {
    // Impede que a página recarregue ao enviar o formulário
    e.preventDefault();

    // Organiza os dados que serão enviados para a API
    const item = {
      nome_item: nome,
      preco_unitario: Number(preco),
      tipo_item: tipo
    };

    try {
      // Se existe um ID, utiliza a rota de alteração; caso contrário, a de cadastro
      const url = idEditar
        ? `https://cafeteria-api-bianca.onrender.com/cardapio/${idEditar}`
        : 'https://cafeteria-api-bianca.onrender.com/cardapio';

      // Envia os dados usando PUT para alterar ou POST para cadastrar
      const resposta = await fetch(url, {
        method: idEditar ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });

      // Verifica se a API retornou uma resposta de sucesso
      if (!resposta.ok) {
        alert('Não foi possível salvar o item.');
        return;
      }

      // Limpa o formulário e atualiza a lista
      limparFormulario();
      carregarItens();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  // Preenche o formulário com os dados do item escolhido para edição
  const editarItem = (item) => {
    setIdEditar(item.id_item);
    setNome(item.nome_item);
    setPreco(item.preco_unitario);
    setTipo(item.tipo_item);
  };

  // Exclui um item do cardápio
  const excluirItem = async (id) => {
    // Pede confirmação antes de excluir
    if (!window.confirm('Deseja excluir este item?')) {
      return;
    }

    try {
      // Envia uma requisição DELETE para a API com o ID do item
      const resposta = await fetch(
        `https://cafeteria-api-bianca.onrender.com/cardapio/${id}`,
        { method: 'DELETE' }
      );

      // Verifica se a exclusão foi realizada
      if (!resposta.ok) {
        alert('Não foi possível excluir o item.');
        return;
      }

      // Atualiza a lista após a exclusão
      carregarItens();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  // Limpa os campos e encerra o modo de edição
  const limparFormulario = () => {
    setIdEditar(null);
    setNome('');
    setPreco('');
    setTipo('');
  };

  return (
    <div>
      <h2 className="mb-4">Gerenciar cardápio</h2>

      {/* Formulário para cadastrar ou alterar itens */}
      <form onSubmit={salvarItem} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">Nome do item:</label>
          <input
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Preço (R$):</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            className="form-control"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo do item:</label>
          <input
            className="form-control"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
        </div>

        <div>
          {/* O texto do botão muda conforme o modo de cadastro ou edição */}
          <button className="btn botao me-2" type="submit">
            {idEditar ? 'Salvar alterações' : 'Cadastrar item'}
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

      {/* Tabela que exibe os itens cadastrados */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {/* Percorre a lista e cria uma linha para cada item */}
            {itens.map((item) => (
              <tr key={item.id_item}>
                <td>{item.id_item}</td>
                <td>{item.nome_item}</td>
                <td>
                  {/* Formata o preço como moeda brasileira */}
                  {Number(item.preco_unitario).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
                <td>{item.tipo_item}</td>
                <td>
                  {/* Carrega os dados do item no formulário */}
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editarItem(item)}
                  >
                    Editar
                  </button>

                  {/* Exclui o item selecionado */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => excluirItem(item.id_item)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

            {/* Exibe uma mensagem quando não há itens cadastrados */}
            {itens.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  Nenhum item cadastrado.
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
export default Cardapio;
