import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


/*import AddCliente from "./components/add-cliente.component";
import Cliente from './components/cliente.component'; 
import clientelist from "./components/cliente-list.component";*/

import AddProdutos from "./components/produtos/add-produtos.component";
import Produtos from "./components/produtos/produtos.component";
import ProdutosList from "./components/produtos/produtos-list.component"
import carrinholist from "./components/carrinho/carrinho-list.component";

import Compra from "./components/compra/compra.componet";

//import cliente from "./components/cliente.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/produtos"} className="navbar-brand">
          Devnology
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/produtos"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/produtos"} className="nav-link">
                Produtos Nacionais 
              </Link>
            </li>


            <li className="nav-item">
              <Link to={"/produtos"} className="nav-link">
                Produtos Europeus
              </Link>
            </li>
           
         
          </div>        
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/produtos"]} component={ProdutosList} />
            <Route exact path="/add" component={AddProdutos} />
            <Route path="/produtos/:id" component={Produtos} />
            <Route path="/carrinho/" component={carrinholist} />
            <Route path="/comprar/" component={Compra} />

          </Switch>
        </div>      
      </div>    
    );
  }
}

export default App;
