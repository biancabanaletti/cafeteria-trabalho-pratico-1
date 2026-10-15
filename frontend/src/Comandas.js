import { useState, useEffect } from 'react';

function Comandas() {
  const [comandas, setComandas] = useState([]);
  const [consumidores, setConsumidores] = useState([]);
  const [data, setData] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [idConsumidor, setIdConsumidor] = useState('');
  const [idEditar, setIdEditar] = useState(null);

  const carregarDados = async () => {
    try {
      const respostaComandas = await fetch('https://cafeteria-api-bianca.onrender.com/comandas');
      const dadosComandas = await respostaComandas.json();
      setComandas(dadosComandas);

      const respostaConsumidores = await fetch(
        'https://cafeteria-api-bianca.onrender.com/consumidores'
      );
      const dadosConsumidores = await respostaConsumidores.json();
      setConsumidores(dadosConsumidores);
    } catch (erro) {
      alert('Erro ao carregar os dados.');
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const salvarComanda = async (e) => {
    e.preventDefault();

    const comanda = {
      data_abertura: data,
      quantidade_itens: Number(quantidade),
      id_consumidor: Number(idConsumidor)
    };

    try {
      const url = idEditar
        ? `https://cafeteria-api-bianca.onrender.com/comandas/${idEditar}`
        : 'https://cafeteria-api-bianca.onrender.com/comandas';

      const resposta = await fetch(url, {
        method: idEditar ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comanda)
      });

      if (!resposta.ok) {
        alert('Não foi possível salvar a comanda.');
        return;
      }

      limparFormulario();
      carregarDados();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  const editarComanda = (comanda) => {
    setIdEditar(comanda.id_comanda);
    setData(String(comanda.data_abertura).slice(0, 10));
    setQuantidade(comanda.quantidade_itens);
    setIdConsumidor(String(comanda.id_consumidor));
  };

  const excluirComanda = async (id) => {
    if (!window.confirm('Deseja excluir esta comanda?')) {
      return;
    }

    try {
      const resposta = await fetch(
        `https://cafeteria-api-bianca.onrender.com/comandas/${id}`,
        { method: 'DELETE' }
      );

      if (!resposta.ok) {
        alert('Não foi possível excluir a comanda.');
        return;
      }

      carregarDados();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  const limparFormulario = () => {
    setIdEditar(null);
    setData('');
    setQuantidade('');
    setIdConsumidor('');
  };

  return (
    <div>
      <h2 className="mb-4">Gerenciar comandas</h2>

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
          <button className="btn botao me-2" type="submit">
            {idEditar ? 'Salvar alterações' : 'Cadastrar comanda'}
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
              <th>Data de abertura</th>
              <th>Quantidade de itens</th>
              <th>Consumidor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {comandas.map((comanda) => {
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
                    {consumidor
                      ? consumidor.nome_completo
                      : `ID ${comanda.id_consumidor}`}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => editarComanda(comanda)}
                    >
                      Editar
                    </button>

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

export default Comandas;