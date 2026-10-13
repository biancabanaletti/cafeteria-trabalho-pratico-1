import { useState, useEffect } from 'react';

function Consumidores() {
  const [consumidores, setConsumidores] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idEditar, setIdEditar] = useState(null);

  const carregarConsumidores = async () => {
    try {
      const resposta = await fetch('http://localhost:3001/consumidores');
      const dados = await resposta.json();
      setConsumidores(dados);
    } catch (erro) {
      alert('Erro ao carregar consumidores.');
    }
  };

  useEffect(() => {
    carregarConsumidores();
  }, []);

  const salvarConsumidor = async (e) => {
    e.preventDefault();

    const consumidor = {
      nome_completo: nome,
      telefone: telefone
    };

    try {
      const url = idEditar
        ? `http://localhost:3001/consumidores/${idEditar}`
        : 'http://localhost:3001/consumidores';

      const resposta = await fetch(url, {
        method: idEditar ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(consumidor)
      });

      if (!resposta.ok) {
        alert('Não foi possível salvar o consumidor.');
        return;
      }

      limparFormulario();
      carregarConsumidores();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  const editarConsumidor = (consumidor) => {
    setIdEditar(consumidor.id_consumidor);
    setNome(consumidor.nome_completo);
    setTelefone(consumidor.telefone || '');
  };

  const excluirConsumidor = async (id) => {
    if (!window.confirm('Deseja excluir este consumidor?')) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3001/consumidores/${id}`,
        { method: 'DELETE' }
      );

      if (!resposta.ok) {
        alert('Não foi possível excluir o consumidor.');
        return;
      }

      carregarConsumidores();
    } catch (erro) {
      alert('Erro ao conectar com a API.');
    }
  };

  const limparFormulario = () => {
    setIdEditar(null);
    setNome('');
    setTelefone('');
  };

  return (
    <div>
      <h2 className="mb-4">Gerenciar consumidores</h2>

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
          <button className="btn botao me-2" type="submit">
            {idEditar ? 'Salvar alterações' : 'Cadastrar consumidor'}
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
              <th>Nome completo</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {consumidores.map((consumidor) => (
              <tr key={consumidor.id_consumidor}>
                <td>{consumidor.id_consumidor}</td>
                <td>{consumidor.nome_completo}</td>
                <td>{consumidor.telefone || '-'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editarConsumidor(consumidor)}
                  >
                    Editar
                  </button>

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

export default Consumidores;