import http from "../api-backend";
import ICompraData from "../types/compra.type"

class CompraDataService {
  getAll(id_cliente:string) {
    return http.get<Array<ICompraData>>(`/carrinho/${id_cliente}`);
  }
 

  get(id: string) {
    return http.get<ICompraData>(`/carrinho/${id}`);
  }

  create(data: ICompraData) {
    return http.post<ICompraData>("/carrinho", data);
  }

  update(data: ICompraData, id: any) {
    return http.put<any>(`/carrinho/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/carrinho/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/carrinho`);
  }

  findByTitle(title: string) {
    return http.get<Array<ICompraData>>(`/carrinho?title=${title}`);
  }
}

export default new CompraDataService();