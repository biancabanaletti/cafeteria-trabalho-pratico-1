import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa os componentes de cada área do sistema
import Cardapio from './Cardapio';
import Consumidores from './Consumidores';
import Comandas from './Comandas';

function App() {
  // Guarda qual tela está sendo exibida
  const [tela, setTela] = useState('inicio');

  // Volta para a tela inicial
  function voltarInicio() {
    setTela('inicio');
  }

  // Exibe as telas internas quando o usuário sai da página inicial
  if (tela !== 'inicio') {
    return (
      <div className="pagina">
        {/* Menu de navegação */}
        <nav className="navbar navbar-expand-lg navbar-dark menu">
          <div className="container">
            {/* Nome da cafeteria, que também permite voltar ao início */}
            <a
              className="navbar-brand"
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                voltarInicio();
              }}
            >
              Cafeteria
            </a>

            {/* Botões para trocar de tela */}
            <div className="navbar-nav">
              <button className="nav-link" onClick={voltarInicio}>
                Início
              </button>
              <button
                className="nav-link"
                onClick={() => setTela('cardapio')}
              >
                Cardápio
              </button>
              <button
                className="nav-link"
                onClick={() => setTela('consumidores')}
              >
                Consumidores
              </button>
              <button
                className="nav-link"
                onClick={() => setTela('comandas')}
              >
                Comandas
              </button>
            </div>
          </div>
        </nav>

        <main className="container conteudo">
          {/* Mostra o título de acordo com a tela selecionada */}
          <h1 className="titulo-secao">
            {tela === 'cardapio' && 'Cardápio'}
            {tela === 'consumidores' && 'Consumidores'}
            {tela === 'comandas' && 'Comandas'}
          </h1>

          {/* Exibe o componente correspondente à tela selecionada */}
          {tela === 'cardapio' ? (
            <Cardapio />
          ) : tela === 'consumidores' ? (
            <Consumidores />
          ) : tela === 'comandas' ? (
            <Comandas />
          ) : (
            null
          )}

          {/* Botão para voltar à página inicial */}
          <button className="btn botao" onClick={voltarInicio}>
            Voltar ao início
          </button>
        </main>

        {/* Rodapé exibido nas telas internas */}
        <footer className="rodape">
          Sistema de Gerenciamento de Cafeteria
        </footer>
      </div>
    );
  }

  // Exibe a página inicial quando nenhuma área está selecionada
  return (
    <div className="pagina">
      {/* Menu principal do sistema */}
      <nav className="navbar navbar-expand-lg navbar-dark menu">
        <div className="container">
          <a className="navbar-brand" href="#inicio">
            Cafeteria
          </a>

          {/* Permite acessar as diferentes áreas do sistema */}
          <div className="navbar-nav">
            <button className="nav-link" onClick={voltarInicio}>
              Início
            </button>
            <button className="nav-link" onClick={() => setTela('cardapio')}>
              Cardápio
            </button>
            <button className="nav-link" onClick={() => setTela('consumidores')}>
              Consumidores
            </button>
            <button className="nav-link" onClick={() => setTela('comandas')}>
              Comandas
            </button>
          </div>
        </div>
      </nav>

      <main className="container conteudo" id="inicio">
        {/* Apresentação inicial do sistema */}
        <section className="boas-vindas">
          <p className="subtitulo">SEJA BEM-VINDO(A)!</p>

          <h1>Um bom café faz toda a diferença!</h1>

          <p>
            Gerencie o cardápio, os consumidores e as comandas
            de forma simples e prática!
          </p>
        </section>

        <h2 className="titulo-secao">Gerenciar cafeteria</h2>

        {/* Cards que dão acesso às principais áreas do sistema */}
        <div className="row g-4">
          {/* Card de acesso ao cardápio */}
          <div className="col-md-4" id="cardapio">
            <div className="card cartao h-100">
              <div className="card-body">
                <div className="icone"></div>
                <h3>Cardápio</h3>
                <p>Cadastre e organize os itens e seus preços</p>

                <button
                  className="btn botao"
                  onClick={() => setTela('cardapio')}
                >
                  Acessar
                </button>
              </div>
            </div>
          </div>

          {/* Card de acesso aos consumidores */}
          <div className="col-md-4" id="consumidores">
            <div className="card cartao h-100">
              <div className="card-body">
                <div className="icone"></div>
                <h3>Consumidores</h3>
                <p>Cadastre e consulte os consumidores</p>

                <button
                  className="btn botao"
                  onClick={() => setTela('consumidores')}
                >
                  Acessar
                </button>
              </div>
            </div>
          </div>

          {/* Card de acesso às comandas */}
          <div className="col-md-4" id="comandas">
            <div className="card cartao h-100">
              <div className="card-body">
                <div className="icone"></div>
                <h3>Comandas</h3>
                <p>Organize as comandas e acompanhe seus registros</p>

                <button
                  className="btn botao"
                  onClick={() => setTela('comandas')}
                >
                  Acessar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé da página inicial */}
      <footer className="rodape">
        Sistema de Gerenciamento de Cafeteria
      </footer>
    </div>
  );
}

// Exporta o componente principal para ser utilizado pela aplicação
export default App;