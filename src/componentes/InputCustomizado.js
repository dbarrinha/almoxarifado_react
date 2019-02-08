import React,{Component} from 'react'


export default class InputCustomizado extends Component{

	render(){
		return(
		<div className="pure-control-group">
                        <label htmlFor={this.props.id}>{this.props.label}</label>
                        <input id={this.props.id} placeholder={this.props.placeholder} name={this.props.name} type={this.props.type} value={this.props.value} onChange={this.props.onChange}/>
                    </div>
		);
	}
}