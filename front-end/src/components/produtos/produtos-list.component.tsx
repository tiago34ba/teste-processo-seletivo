import { Component, ChangeEvent } from "react";
import ProdutoDataService from "../../services/produtos.service";
import carrinhoService from "../../services/carrinho.service";

import { Link } from "react-router-dom";
import IProdutoData from '../../types/produtos.type';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StyledBadge from '@material-ui/core/Badge';




import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import uuid from 'react-uuid';
import { createBrowserHistory } from "history"
import { useHistory } from "react-router-dom";

import  { Redirect } from 'react-router-dom'



const history = createBrowserHistory({
  basename: "/"
})




type Props = {};

type State = {
  Produtos: Array<IProdutoData>,
  currentProduto: IProdutoData | null,
  currentIndex: number,
  searchTitle: string,
  idCliente: string | null,
  totalItem:string|"0"
};

export default class produtoslist extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveProdutos = this.retrieveProdutos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduto = this.setActiveProduto.bind(this);
    this.removeAllProdutos = this.removeAllProdutos.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.finalizarCompra=this.finalizarCompra.bind(this);

    if (sessionStorage.getItem('id-cliente') == null) {
      sessionStorage.setItem('id-cliente', uuid());
    }

    

    this.state = {
      Produtos: [],
      currentProduto: null,
      currentIndex: -1,
      searchTitle: "",
      idCliente: sessionStorage.getItem('id-cliente'),
      totalItem:"0"
    

    };
   
  }

  componentDidMount() {
    this.retrieveProdutos();
   
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveProdutos() {
    ProdutoDataService.getAll()
    
      .then((response: any) => {
        this.gettotalItemCart();
        this.setState({
          Produtos: response.data
        });
        
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProdutos();
    this.setState({
      currentProduto: null,
      currentIndex: -1
    });
  }

  setActiveProduto(Produto: IProdutoData, index: number) {
    this.setState({
      currentProduto: Produto,
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
      currentProduto: null,
      currentIndex: -1
    });

    ProdutoDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          Produtos: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  addTocart(currentProduto: any) {
    
   
    let objArr = []; //Array final
    objArr[1]=currentProduto;
    objArr.map((produto:any, index:number) => {
      let produtoCart: any = {
      uuid_cliente:localStorage.getItem('id-cliente'),
      nome_produto:produto.nome,
      descricao_produto:produto.descricao,
      categoria_produto:produto.categoria,
      imagem: produto.imagem,
      valor_unitario:produto.preco,
      cod_produto:produto.id,
      quantidade:1,
      }
      carrinhoService.addTocart(produtoCart)            
      .then((response: any) => {            
        this.gettotalItemCart();
        console.log(produtoCart);  
        alert('Item adicionado no carrinho com sucesso.');  
      })             
      .catch((e: Error) => {            
        console.log(e);            
                 
    });
     
    })
        
  }

  finalizarCompra(currentProduto: any) {
    this.setState({
      //currentItem: null,
      currentIndex: -1
    });
    //let history = useHistory();
    history.push('/comprar', { currentProduto: currentProduto });
   
  }
    
   gettotalItemCart(){
      let uuid_cliente=  localStorage.getItem('id-cliente');
      carrinhoService.getTotalItemCart(uuid_cliente).then((response: any) => {
      this.setState({
        totalItem: response.data
      });
      
    })
     
   }
  
  render() {
    const { searchTitle, Produtos, currentProduto, currentIndex,totalItem } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>

            <Link
              to={"/carrinho"}
            >
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={totalItem} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>


          </div>
        </div>
        <div className="col-md-8">
          <h4>Lista de Produtos </h4>
          <hr></hr>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {Produtos &&
              Produtos.map((Produto: IProdutoData, index: number) => (
                <Grid item xs={6} md={6}
                  className={
                    "list-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduto(Produto, index)}
                  key={index}
                >
                  <Link to={'#'}>
                    <Card sx={{ maxWidth: 345 }}>

                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={Produto.imagem}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          <div>
                            <label>
                              <strong>Title:</strong>
                            </label>{" "}
                            {Produto.nome}
                          </div>
                          <div>
                            <label>
                              <strong>Preço:</strong>
                            </label>{" "}
                            {Produto.preco ? Produto.preco : 0}
                          </div>

                        </Typography>

                      </CardContent>

                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>

        </div>
        <div className="col-md-4">
          {currentProduto ? (
            <div>
              <h4>Produto</h4>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={currentProduto.imagem}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <div>
                      <label>
                        <strong>Title:</strong>
                      </label>{" "}
                      {currentProduto.nome}
                    </div>
                    <div>
                      <label>
                        <strong>preço:</strong>
                      </label>{" "}
                      {currentProduto.preco ? currentProduto.preco : 0}
                    </div>

                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div>

                      {currentProduto.descricao}
                    </div>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small"  onClick={() => this.addTocart(currentProduto)}>Adicionar ao Carrinho</Button>
                 {/*  <Button size="small"  type="button" onClick={() => this.finalizarCompra(currentProduto)}>Comprar Agora</Button>*/}
                  <Link to={{pathname: "/comprar",  state: currentProduto }}> Comprar Agora</Link>
                
                </CardActions>
              </Card>
            </div>
          ) : (
            <div>
            </div>
          )}

        </div>

      </div>



    );
  }
}
