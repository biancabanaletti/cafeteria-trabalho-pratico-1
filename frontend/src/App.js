import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cardapio from './Cardapio';
import Consumidores from './Consumidores';
import Comandas from './Comandas';

function App() {
const [tela, setTela] = useState('inicio');

function voltarInicio() {
setTela('inicio');
}

if (tela !== 'inicio') {
return (
<div className="pagina">
<nav className="navbar navbar-expand-lg navbar-dark menu">
<div className="container">
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
      <h1 className="titulo-secao">
        {tela === 'cardapio' && 'Cardápio'}
        {tela === 'consumidores' && 'Consumidores'}
        {tela === 'comandas' && 'Comandas'}
      </h1>

      {tela === 'cardapio' ? (
  <Cardapio />
) : tela === 'consumidores' ? (
  <Consumidores />
) : tela === 'comandas' ? (
  <Comandas />
) : (
  <p>Esta área será desenvolvida na próxima etapa.</p>
)}

      <button className="btn botao" onClick={voltarInicio}>
        Voltar ao início
      </button>
    </main>

    <footer className="rodape">
      Sistema de Gerenciamento de Cafeteria
    </footer>
  </div>
);

}

return (
<div className="pagina">
<nav className="navbar navbar-expand-lg navbar-dark menu">
<div className="container">
<a className="navbar-brand" href="#inicio">
Cafeteria
</a>
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
    <section className="boas-vindas">
      <p className="subtitulo">SEJA BEM-VINDO(A)!</p>

      <h1>Um bom café faz toda a diferença!</h1>

      <p>
        Gerencie o cardápio, os consumidores e as comandas
        de forma simples e prática!
      </p>
    </section>

    <h2 className="titulo-secao">Gerenciar cafeteria</h2>

    <div className="row g-4">
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

  <footer className="rodape">
    Sistema de Gerenciamento de Cafeteria
  </footer>
</div>

);
}

export default App;