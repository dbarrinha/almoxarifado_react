import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';



class App extends Component {
  
    constructor(){
        super();
        this.state = {usuario: localStorage.getItem('usuario')};

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
                <li className="pure-menu-item pure-menu-selected"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="./Produto" className="pure-menu-link">Produto</a></li>
                <li className="pure-menu-item"><a href="./logout" className="pure-menu-link">Sair</a></li>

            </ul>
        </div>
    </div>

    <div id="main">
        <div className="header">
            <h1>Bem Vindo {this.state.usuario.nome}</h1>
            
        </div>

    </div>
</div>
    );
  }
}

export default App;
