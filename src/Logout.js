import React, {Component} from 'react';
import history from './componentes/history';

export default class Logout extends Component {
	
	componentWillMount(){
		localStorage.removeItem('usuario');
		history.push('/');
	}

	render(){
		return null;
	}
}
