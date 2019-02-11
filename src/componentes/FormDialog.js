import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import $ from'jquery';
import PubSub from 'pubsub-js';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  constructor(){
    super();
    this.state = {quantidade:''};
    this.addQuantidade = this.addQuantidade.bind(this);
    this.setQuantidade = this.setQuantidade.bind(this);
  }

  addQuantidade(evento){
    
    evento.preventDefault();
    $.ajax({
      url:'http://mobilaravel.herokuapp.com/api/produtos/'+this.props.id,
      contentType: 'application/json',
      dataType:'json',
      type:'PUT',
      data:JSON.stringify({nome:this.props.nome,quantidade:this.state.quantidade}),
      success: function(resposta){
        alert("Quantidade atualizada de: " + this.props.quantidade+" para: "+this.state.quantidade);
        PubSub.publish('atualiza');
        
      }.bind(this),
      error: function(resposta){
        console.log("erro");
      }


    });
    this.handleClose();
  }

  setQuantidade(evento){
    var teste1 = evento.target.value;
    var teste2 = this.props.quantidade;
    var valor = Number.parseInt(teste1,10) + Number.parseInt(teste2,10);
    console.log("valor teste: "+valor);
    this.setState({quantidade:valor});
  }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          add+
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          onExit={this.props.onHide}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.props.titulo}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Valor atual:{this.props.quantidade}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Valor à adicionar"
              type="email"
              onChange={this.setQuantidade}
              fullWidth

            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addQuantidade}  color="primary">
              salvar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}