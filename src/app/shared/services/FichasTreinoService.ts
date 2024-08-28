import { FichaTreinoModel } from '../models/FichaTreinoModel';
import { api } from './api';


class FichasTreinoService {
  async getAll(): Promise<FichaTreinoModel[]> {
    const response = await api.get('/fichasTreino');
    return response.data;
  }

  async getById(id: string): Promise<FichaTreinoModel> {
    const response = await api.get(`/fichasTreino/${id}`);
    return response.data;
  }

  async create(plano: Omit<FichaTreinoModel, 'id'>): Promise<FichaTreinoModel> {
    const response = await api.post('/fichasTreino', plano);
    return response.data;
  }

  async update(id: string, plano: Partial<Omit<FichaTreinoModel, 'id'>>): Promise<FichaTreinoModel> {
    const response = await api.put(`/fichasTreino/${id}`, plano);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/fichasTreino/${id}`);
  }
}

export default new FichasTreinoService();
