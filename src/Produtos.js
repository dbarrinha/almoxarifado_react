import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from'jquery';
import InputCustomizado from './componentes/InputCustomizado.js';
import FormDialog from './componentes/FormDialog.js';
import FormDialogAtualiza from './componentes/FormDialogAtualiza.js';
import TratadorErros from './TratadorErros.js'
import PubSub from 'pubsub-js';


class App extends Component {
  
  constructor(){
    super();
    this.state = {lista : [],nome:'',quantidade:'', msg: ''}
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setQuantidade = this.setQuantidade.bind(this);
    this.atualizaLista = this.atualizaLista.bind(this);
  }

  mudaEstado = () => this.setstate({lista:[]});

  componentDidMount(){
    $.ajax({
      url:"http://mobilaravel.herokuapp.com/api/produtos",
      dataType: 'json',
      success:function(resposta){
        this.setState({lista:resposta});
      }.bind(this)
    });

    PubSub.subscribe('atualiza',() => {
      this.atualizaLista();
    });
  }




  enviaForm(evento){
    evento.preventDefault();
    $.ajax({
      url:'http://mobilaravel.herokuapp.com/api/produtos',
      contentType: 'application/json',
      dataType:'json',
      type:'POST',
      data:JSON.stringify({nome:this.state.nome,quantidade:this.state.quantidade}),
      success: function(resposta){
        alert("Produto salvo com sucesso!");
        this.setState({lista:resposta});
      }.bind(this),
      error: function(resposta){
          alert("Erro Ao Salvar Produto");
        
      }


    });
  }

  

  setNome(evento){
    this.setState({nome:evento.target.value});
  }

  setQuantidade(evento){
    this.setState({quantidade:evento.target.value});
  }

  atualizaLista(evento){
    
      $.ajax({
      url:"http://mobilaravel.herokuapp.com/api/produtos",
      dataType: 'json',
      success: function(resposta){
        
        this.setState({lista:resposta});
        console.log("teste");
      }.bind(this),
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
                <li className="pure-menu-item "><a href="./home" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item pure-menu-selected"><a href="#" className="pure-menu-link">Produto</a></li>
                <li className="pure-menu-item"><a href="./logout" className="pure-menu-link">Sair</a></li>  
            </ul>
        </div>
    </div>

    <div id="main">
        <div className="header">
            <h1>Cadastro de Produto</h1>
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
              
                <fieldset>
                    <span>{this.state.msg}</span>
                    <InputCustomizado id="nome" name="nome" label="Nome" placeholder="Ex: café, sabão..." type="text" value={this.state.nome} onChange={this.setNome}/>
                    <InputCustomizado id="quantidade" name="quantidade" label="Quantidade Inicial" placeholder="123" type="number" value={this.state.quantidade} onChange={this.setQuantidade}/>
                    

                   

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
                      this.state.lista.map((produto) => {
                        return (
                          <tr key={produto.id}>
                              <td>{produto.id}</td>
                              <td>{produto.nome}</td>
                              <td>{produto.quantidade}</td>
                              <td><FormDialog titulo={produto.nome}  id={produto.id} quantidade={produto.quantidade} /></td>
                              <td><FormDialogAtualiza titulo={produto.nome} id={produto.id} quantidade={produto.quantidade} /></td>
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
