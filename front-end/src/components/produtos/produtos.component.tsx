import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import ProdutosDataService from "../../services/produtos.service";

import IProdutosData from "../../types/produtos.type";
interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentProduto: IProdutosData;
  message: string;
}

export default class produtos extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getProduto = this.getProduto.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
    this.deleteProduto = this.deleteProduto.bind(this);

    this.state = {
      currentProduto: {
        id: null,
        nome: "",
        descricao: "",
        preco: "",
        categoria: "",
        imagem: "",
        material: "",
        departamento: ""
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProduto(this.props.match.params.id);
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduto: {
          ...prevState.currentProduto,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentProduto: {
        ...prevState.currentProduto,
        description: description,
      },
    }));
  }

  getProduto(id: string) {
    ProdutosDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentProduto: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

 
  updateProduto() {
    ProdutosDataService.update(
      this.state.currentProduto,
      this.state.currentProduto.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The Produto was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteProduto() {
    ProdutosDataService.delete(this.state.currentProduto.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/Produtos");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentProduto } = this.state;

    return (
      <div>
        {currentProduto ? (
          <div className="edit-form">
            <h4>Produto</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentProduto.nome}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProduto.descricao}
                  onChange={this.onChangeDescription}
                />
              </div>

             
            </form>

            {currentProduto.preco? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => 
                  //this.updatePublished(false)
                console.log('comprar')
                }
              >
                Adicionar ao Carrinho
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => //this.updatePublished(true)
                console.log('comprar')
                }
              >
                Comprar
              </button>
            )}


            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Produto...</p>
          </div>
        )}
      </div>
    );
  }
}
