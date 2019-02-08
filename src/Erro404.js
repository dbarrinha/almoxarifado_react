import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Sobre extends Component {
 render() {
 return (
    <div className='App'>
       <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Página Não Encontrada : 404</h1>
          <a className='App-link'  href="./">Ir Para página principal</a>
       </header>
       <p className='App-intro'>
            Página não encontrada :)
       </p>
    </div>
 );
 }
}
export default Sobre;