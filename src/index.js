import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/Login.css';
import { Router, Switch, Route,Redirect } from 'react-router-dom'
import App from './App';
import Login from './Login';
import Logout from './Logout.js';
import Produto from './Produtos';
import Erro404 from './Erro404';
import * as serviceWorker from './serviceWorker';
import history from './componentes/history';



ReactDOM.render(
	<Router history={history}>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/home" exact={true}  render={()=> (
            	localStorage.getItem('usuario') === null ? (
            		<Redirect to='/'/>
            		) : (
            		<App />
            		
            		)
            	)} />
            <Route path="/produto" render={()=> (
            	localStorage.getItem('usuario') === null ? (
            		<Redirect to='/'/>
            		) : (
            		<Produto />
            		
            		)
            	)} />
            <Route path="/logout"  component={Logout} />
            <Route path="*" component={Erro404} />
             
        </Switch>
    </ Router>, 
	document.getElementById('root')

);


serviceWorker.unregister();
