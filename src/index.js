import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App';
import Produto from './Produtos';
import Erro404 from './Erro404';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/produto" component={Produto} />
            <Route path="*" component={Erro404} />
        </Switch>
    </ BrowserRouter>, 
	document.getElementById('root')

);


serviceWorker.unregister();
