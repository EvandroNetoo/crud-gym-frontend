import { api } from './api'; // Ajuste o caminho conforme necessário
import { PlanoModel } from '../models/PlanoModel'; // Ajuste o caminho conforme necessário


export class PlanosService {
  // Obter todos os planos
  async getAll(): Promise<PlanoModel[]> {
    const response = await api.get('/planos');
    return response.data;
  }

  // Obter um plano pelo ID
  async getById(id: string): Promise<PlanoModel> {
    const response = await api.get(`/planos/${id}`);
    return response.data;
  }

  // Criar um novo plano
  async create(plano: Omit<PlanoModel, 'id'>): Promise<PlanoModel> {
    const response = await api.post('/planos', plano);
    return response.data;
  }

  // Atualizar um plano existente
  async update(id: string, plano: Partial<Omit<PlanoModel, 'id'>>): Promise<PlanoModel> {
    const response = await api.put(`/planos/${id}`, plano);
    return response.data;
  }

  // Excluir um plano pelo ID
  async delete(id: string): Promise<void> {
    await api.delete(`/planos/${id}`);
  }
}

export default new PlanosService();
