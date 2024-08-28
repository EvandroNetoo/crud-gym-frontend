import { api } from './api'; // Ajuste o caminho conforme necessário
import { PlanoModel } from '../models/PlanoModel'; // Ajuste o caminho conforme necessário


export class PlanosService {
  async getAll(): Promise<PlanoModel[]> {
    const response = await api.get('/planos');
    return response.data;
  }

  async getById(id: string): Promise<PlanoModel> {
    const response = await api.get(`/planos/${id}`);
    return response.data;
  }

  async create(plano: Omit<PlanoModel, 'id'>): Promise<PlanoModel> {
    const response = await api.post('/planos', plano);
    return response.data;
  }

  async update(id: string, plano: Partial<Omit<PlanoModel, 'id'>>): Promise<PlanoModel> {
    const response = await api.put(`/planos/${id}`, plano);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/planos/${id}`);
  }
}

export default new PlanosService();
