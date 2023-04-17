import http from "../api-backend";
import ICarrinhoData from "../types/produtos.type"

class CarrinhoDataService {
  getAll(id_cliente:string) {
    //return http.get<Array<ICarrinhoData>>(`/carrinho/${id_cliente}`);
    return http.get<Array<ICarrinhoData>>(`/carrinho`);
  }
 
  get(id: string) {
    return http.get<ICarrinhoData>(`/carrinho/${id}`);
  }

  create(data: ICarrinhoData) {
    return http.post<ICarrinhoData>("/carrinho", data);
  }

  update(data: ICarrinhoData, id: any) {
    return http.put<any>(`/carrinho/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/carrinho/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/carrinho`);
  }

  findByTitle(title: string) {
    return http.get<Array<ICarrinhoData>>(`/carrinho?title=${title}`);
  }

  
addTocart(data: ICarrinhoData) {
  return http.post<ICarrinhoData>("/carrinho", data);
 }
 getTotalItemCart(uuid_cliente:any):any{
  let result= http.get<ICarrinhoData>(`/carrinho/total-cart/${uuid_cliente}`);
  return result;
 }
}

export default new CarrinhoDataService();