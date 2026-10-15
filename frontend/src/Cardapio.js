import { useState, useEffect } from 'react';

function Cardapio() {
  const [itens, setItens] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [tipo, setTipo] = useState('');
  const [idEditar, setIdEditar] = useState(null);

  const carregarItens = async () => {
    try {
      const resposta = await fetch('https://cafeteria-api-bianca.onrender.com/cardapio');
      const dados = await resposta.json();
      setItens(dados);
    } catch (erro) {
      alert('Erro ao carregar o cardápio.');
    }
  };

  useEffect(() => {
    carregarItens();
  }, []);

  const salvarItem = async (e) => {
    e.preventDefault();

    const item = {
      nome_item: nome,
      preco_unitario: Number(preco),
      tipo_item: tipo
    };

    try {
      const url = idEditar
        ? `https://cafeteria-api-bianca.onrender.com/cardapio/${idEditar}`
        : 'https://cafeteria-api-bianca.onrender.com/cardapio';

      const resposta = await fetch(url, {
        method: idEditar ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });

      if (!resposta.ok) {
        alert('Não foi possível salvar o item.');
        return;
      }

      limparFormulario();
      carregarItens();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  const editarItem = (item) => {
    setIdEditar(item.id_item);
    setNome(item.nome_item);
    setPreco(item.preco_unitario);
    setTipo(item.tipo_item);
  };

  const excluirItem = async (id) => {
    if (!window.confirm('Deseja excluir este item?')) {
      return;
    }

    try {
      const resposta = await fetch(
        `https://cafeteria-api-bianca.onrender.com/cardapio/${id}`,
        { method: 'DELETE' }
      );

      if (!resposta.ok) {
        alert('Não foi possível excluir o item.');
        return;
      }

      carregarItens();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  const limparFormulario = () => {
    setIdEditar(null);
    setNome('');
    setPreco('');
    setTipo('');
  };

  return (
    <div>
      <h2 className="mb-4">Gerenciar cardápio</h2>

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
          <button className="btn botao me-2" type="submit">
            {idEditar ? 'Salvar alterações' : 'Cadastrar item'}
          </button>

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
            {itens.map((item) => (
              <tr key={item.id_item}>
                <td>{item.id_item}</td>
                <td>{item.nome_item}</td>
                <td>
                  {Number(item.preco_unitario).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
                <td>{item.tipo_item}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editarItem(item)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => excluirItem(item.id_item)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

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

export default Cardapio;