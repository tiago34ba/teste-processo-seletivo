import { Component, ChangeEvent,useState, useRef, useLayoutEffect} from "react";


import CompraDataService from "../../services/compra.service"
import ICompraData from "../../types/compra.type";


import { Link } from "react-router-dom";
import ICarrinhoData from '../../types/carrinho.type';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageListItem from "@mui/material/ImageListItem";


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { createBrowserHistory } from "history"
import { useHistory } from "react-router-dom";
import carrinhoService from "../../services/carrinho.service";

type Props = {};

type State = ICompraData & {

};

export default class Compra extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.saveCompra = this.saveCompra.bind(this);
    this.newCompra = this.newCompra.bind(this);
    this.totalizaCompra = this.totalizaCompra.bind(this);

    this.state = {
      id_compra: 0,
      id_cliente: 0,
      total_itens: 0,
      total_compra: 0,
      created_at: '',
      intens_compra: props.location.state,
      endereco: null,
      telefone: null
    };
  
   
   
  }



  saveCompra() {
    const data: ICompraData = {

      id_compra: this.state.id_compra,
      id_cliente: this.state.id_cliente,
      total_itens: this.state.total_itens,
      total_compra: this.state.total_compra,
      created_at: this.state.created_at,
      intens_compra: this.state.intens_compra,
      endereco: this.state.endereco,
      telefone: this.state.telefone


    };

    CompraDataService.create(data)
      .then((response: any) => {
        this.setState({
          id_compra: response.data.id_cliente,
          id_cliente: response.data.id_cliente,
          total_itens: response.data.total_itens,
          created_at: response.data.created_at,
          intens_compra: response.data.intens_compra,

        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newCompra() {
    this.setState({
      id_compra: 0,
      id_cliente: 0,
      total_itens: 0,
      total_compra: 0,
      created_at: '',
      intens_compra: [],
      telefone: null,
      endereco: null
    });
  }
  totalizaCompra(){
  
    let total = 0;
    total= this.props.location.state.map((item: any) => {
    total += item.valor_unitario * item.quantidade
     return total;
      
    }) ;

     console.log(total[7]);
     return total[7];
   
  }
  

  render() {
   

    const { id_compra,
      id_cliente,
      total_itens,
      total_compra,
      created_at,
      intens_compra,
      endereco,
      telefone
    } = this.state;

    return (


      <div className="list row">
         <div className="col-md-6">
          <h4>Lista de itens no carrinho </h4>

          <ul className="list-group">
            {
          
          intens_compra &&
            intens_compra.map((intens_compra: any, index: number) => (
             


                <li   className="list-group-item">

                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar`}
                        src={`${intens_compra.imagem}?w=161&fit=crop&auto=format`}
                      />
                    </ListItemAvatar>
                    <ListItemText id={intens_compra.id_carrinho} 
                    primary={` ${intens_compra.nome_produto}`} 
                    secondary={` ${intens_compra.valor_unitario}`} />  
                  </ListItemButton>

                  
                </li>
              ))
              
              }
              
          </ul>

        </div>  
        <div className="col-md-6">
          <div className="submit-form">



            {id_compra ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newCompra}>
                  Add
                </button>
              </div>
            ) : (
              <div>

                
            <div>
            <strong>Resumo de compras</strong>


              <Card sx={{ maxWidth: 345 }}>
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   
                  <div>
                      <label>
                        <strong>Quantidade</strong>
                      </label>{" "}
                      {total_itens}
                    </div>

                    <div>
                      <label>
                        <strong>valor total</strong>
                      </label>{" "}
                      {total_compra}
                    </div>

                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div> </div>
                  </Typography>
                </CardContent>
                <CardActions>
                
                 
                </CardActions>
              </Card>
            </div>
                <div className="form-group">
                  <label htmlFor="title">Nome Cliente </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    // value={intens_compra}
                    //onChange={this.onChangeTitle}
                    name="Nome"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    //value={description}
                    //onChange={this.onChangeDescription}
                    name="description"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Telefone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefone"
                    required
                    value={telefone}

                    name="telefone"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Endereço de Entrega</label>
                  <input
                    type="text"
                    className="form-control"
                    id="endereco"
                    required
                    value={endereco}
                    name="endereco"
                  />
                </div>

                <button onClick={this.saveCompra} className="btn btn-success">
                 finalizar Compra
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
}

