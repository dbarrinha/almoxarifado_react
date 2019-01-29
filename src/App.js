import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from'jquery';

class App extends Component {

  constructor(){
    super();
    this.state = {lista : [],nome:'',quantidade:''}

  }

  componentDidMount(){
    $.ajax({
      url:"http://localhost:80/api/produtos",
      dataType: 'json',
      success:function(resposta){
        this.setState({lista:resposta});
      }.bind(this)
    });
  }


  enviaForm(evento){
    evento.preventDefault();
    $.ajax({
      url:'http://localhost:80/api/produtos',
      contentType: 'application/json',
      dataType:'json',
      type:'POST',
      data:JSON.stringify({nome:this.state.nome,quantidade:this.state.quantidade}),
      success: function(resposta){
        console.log("enviado com sucesso");
      },
      error: function(resposta){
        console.log("erro");
      }


    });
  }

  render() {
    return (

     <div id="layout">
    
    <a href="#menu" id="menuLink" className="menu-link">
        
        <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Almoxarifado</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Produto</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Usuario</a></li>

            </ul>
        </div>
    </div>

    <div id="main">
        <div className="header">
            <h1>Cadastro de Produto</h1>
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">
                <fieldset>
                    <div className="pure-control-group">
                        <label for="nome">Nome</label>
                        <input id="nome" type="text" placeholder="Ex: café, sabão..." />
                    </div>

                    <div className="pure-control-group">
                        <label for="quantidade">Quantidade Inicial</label>
                        <input id="quantidade" type="number" placeholder="000"/>
                    </div>

                   

                    <div className="pure-controls">
                        
                        <button type="submit" className="pure-button pure-button-primary">Salvar</button>
                    </div>
                </fieldset>
            </form>
            <table className="pure-table pure-table-aligned pure-table-horizontal">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {
                      this.state.lista.map(function(produto){
                        return (
                          <tr key={produto.id}>
                              <td>{produto.id}</td>
                              <td>{produto.nome}</td>
                              <td>{produto.quantidade}</td>
                              <td><button>add+</button></td>
                              <td><button>edit</button></td>
                          </tr>
                        );
                      })
                    }

                    
                </tbody>
            </table>
        </div>


        
    </div>
</div>
    );
  }
}

export default App;
