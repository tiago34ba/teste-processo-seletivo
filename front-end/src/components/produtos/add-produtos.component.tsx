import { Component, ChangeEvent } from "react";
import ProdutosDataService from "../../services/produtos.service";
import IProdutoData from '../../types/produtos.type';


type Props = {};

type State = IProdutoData & {

};

export default class AddProdutos extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveProduto = this.saveProduto.bind(this);
    this.newProduto = this.newProduto.bind(this);

    this.state = {

      nome: "",
      descricao: "",
      categoria: "",
      imagem: "",
      preco: "",
      material: "",
      departamento: "",
      id: null,

    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      nome: e.target.value
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      descricao: e.target.value
    });
  }

  saveProduto() {
    const data: IProdutoData = {
      nome: this.state.nome,
      descricao: this.state.descricao,
      categoria: this.state.categoria,
      imagem: this.state.imagem,
      preco: this.state.preco,
      material: this.state.preco,
      departamento: this.state.preco,
    };

    ProdutosDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          nome: response.data.nome,
          descricao: response.data.descricao,
          preco: response.data.preco,

        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newProduto() {
    this.setState({
      id: null,
      nome: "",
      descricao: "",
      preco: "0",
      categoria: ""
    });
  }

  render() {
    const { preco, nome, descricao } = this.state;

    return (
      <div className="submit-form">
        {preco ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduto}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={nome}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={descricao}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveProduto} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
