import http from "../http-common";
import ITutorialData from "../types/produtos.type"

class ProdutosDataService {
  getAll() {
    return http.get<Array<ITutorialData>>("/brazilian_provider");
  }
  getAllBrazilian() {
    return http.get<Array<ITutorialData>>("/brazilian_provider");
  }

  getAllEuropean() {
    return http.get<Array<ITutorialData>>("/european_provider");
  }

  get(id: string) {
    return http.get<ITutorialData>(`/produtos/${id}`);
  }

  create(data: ITutorialData) {
    return http.post<ITutorialData>("/produtos", data);
  }

  update(data: ITutorialData, id: any) {
    return http.put<any>(`/produtos/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/produtos/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/produtos`);
  }

  findByTitle(title: string) {
    return http.get<Array<ITutorialData>>(`/produtos?title=${title}`);
  }
}

export default new ProdutosDataService();