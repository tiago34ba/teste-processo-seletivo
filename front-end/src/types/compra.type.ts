import ICarrinhoData from "./carrinho.type"


export default interface ICompraData {
    id_compra?: any | null,
    id_cliente: number,
    total_itens: number,
    total_compra :number,
    created_at:string,
    intens_compra: ICarrinhoData[]| null,
    endereco:string |null,
    telefone:string|null,
}     
