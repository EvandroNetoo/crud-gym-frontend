import { AlunoModel } from '../models/AlunoModel';
import { api } from './api';


export class AlunosService {
  // Obter todos os planos
  async getAll(): Promise<AlunoModel[]> {
    const response = await api.get('/alunos');
    return response.data;
  }

  // Obter um plano pelo ID
  async getById(id: string): Promise<AlunoModel> {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
  }

  // Criar um novo plano
  async create(plano: Omit<AlunoModel, 'id'>): Promise<AlunoModel> {
    const response = await api.post('/alunos', plano);
    return response.data;
  }

  // Atualizar um plano existente
  async update(id: string, plano: Partial<Omit<AlunoModel, 'id'>>): Promise<AlunoModel> {
    const response = await api.put(`/alunos/${id}`, plano);
    return response.data;
  }

  // Excluir um plano pelo ID
  async delete(id: string): Promise<void> {
    await api.delete(`/alunos/${id}`);
  }
}

export default new AlunosService();
