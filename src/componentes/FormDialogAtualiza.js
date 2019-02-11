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
    this.state = {quantidade:'',nome:''};
    this.addQuantidade = this.addQuantidade.bind(this);
    this.setQuantidade = this.setQuantidade.bind(this);
    this.setNome = this.setNome.bind(this);
  }

  addQuantidade(evento){
    var nome = this.state.nome;
    var quantidade = this.state.quantidade;
    if(nome === ''){
      nome = this.props.titulo;
    }
    if(quantidade === ''){
      quantidade = this.props.quantidade;
    }
    evento.preventDefault();
    $.ajax({
      url:'http://mobilaravel.herokuapp.com/api/produtos/'+this.props.id,
      contentType: 'application/json',
      dataType:'json',
      type:'PUT',
      data:JSON.stringify({nome:nome,quantidade:quantidade}),
      success: function(resposta){
        console.log(resposta);
        PubSub.publish('atualiza');
      },
      error: function(resposta){
        
        
      }


    });
    this.handleClose();
  }

  setQuantidade(evento){
    this.setState({quantidade:evento.target.value});
  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Editar
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
              id="nome"
              label="Nome"
              type="email"
              onChange={this.setNome}
              fullWidth

            />
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