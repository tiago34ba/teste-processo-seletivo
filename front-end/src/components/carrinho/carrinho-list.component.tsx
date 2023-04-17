import { Component, ChangeEvent } from "react";
import ProdutoDataService from "../../services/produtos.service";

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

//table 

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';

import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
//import DeleteIcon from '@mui/icons-material/Delete';
//import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';




const history = createBrowserHistory({
  basename: "/"
})


type Props = {};

type State = {
  itensCarrinho: any, //Array<ICarrinhoData>,
  currentItem: ICarrinhoData | null,
  currentIndex: number,
  searchTitle: string
};

export default class carrinholist extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveItensCarrinho = this.retrieveItensCarrinho.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduto = this.setActiveProduto.bind(this);
    this.removeAllProdutos = this.removeAllProdutos.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    //this.finalizarCompra = this.finalizarCompra.bind(this);

    this.state = {
      itensCarrinho: [],
      currentItem: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveItensCarrinho();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveItensCarrinho() {
   let id_cliente:any;
    if(localStorage.getItem('id_cliente')!=null){
      id_cliente= localStorage.getItem('id_cliente');
    }
    id_cliente= 1;
    
    carrinhoService.getAll(id_cliente)
      .then((response: any) => {
      
        this.setState({
          itensCarrinho:response.data.data,//response.data,
        });
       
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveItensCarrinho();
    this.setState({
      currentItem: null,
      currentIndex: -1
    });
  }

  setActiveProduto(Iitem: ICarrinhoData, index: number) {
    this.setState({
      currentItem: Iitem,
      currentIndex: index
    });


  }

  removeAllProdutos() {
    ProdutoDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentItem: null,
      currentIndex: -1
    });

    ProdutoDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          itensCarrinho: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  finalizarCompra(produto: any) {
    //const history = useHistory(); //chamado do hook


    this.setState({
      currentItem: null,
      currentIndex: -1
    });
     history.push('/comprar',{state:  produto});
    
  }





  
  

  render() {
    const { searchTitle, itensCarrinho, currentItem, currentIndex } = this.state;
   
     
    return (
      <div className="list row">

        <div className="col-md-6">
          <h4>Lista de itens no carrinho </h4>

          <ul className="list-group">
            {
          
            itensCarrinho &&
              itensCarrinho.map((ItemCarrinho: ICarrinhoData, index: number) => (



                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduto(ItemCarrinho, index)}
                  key={index}
                >

                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar`}
                        src={`${"http://placeimg.com/640/480/city"}?w=161&fit=crop&auto=format`}
                      />
                    </ListItemAvatar>
                    <ListItemText id={ItemCarrinho.id_carrinho} primary={` ${ItemCarrinho.nome_produto}`} />
                  </ListItemButton>

                  {ItemCarrinho.nome_produto}
                </li>
              ))
              
              }
          </ul>

        </div>
        <div className="col-md-6">
        
            <div>
            <strong>Resumo de compras</strong>



              <Link
                to="/Carrinho/" 
                className="badge badge-warning"
              >
                Edit
              </Link>

              <Card sx={{ maxWidth: 345 }}>
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   
                  <div>
                      <label>
                        <strong>Quantidade</strong>
                      </label>{" "}
                      {"6"}
                    </div>

                    <div>
                      <label>
                        <strong>valor total</strong>
                      </label>{" "}
                      {"R$:1000,00"}
                    </div>

                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div> </div>
                  </Typography>
                </CardContent>
                <CardActions>
                
                  <Link to={{pathname: "/comprar",  state: itensCarrinho }}> Comprar Agora</Link>
                </CardActions>
              </Card>
            </div>
        


        </div>

      </div>



    );
  }
}
