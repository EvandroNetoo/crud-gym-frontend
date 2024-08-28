import { AlunoModel } from '../models/AlunoModel';
import { api } from './api';


export class AlunosService {
  async getAll(): Promise<AlunoModel[]> {
    const response = await api.get('/alunos');
    return response.data;
  }

  async getById(id: string): Promise<AlunoModel> {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
  }

  async create(plano: Omit<AlunoModel, 'id'>): Promise<AlunoModel> {
    const response = await api.post('/alunos', plano);
    return response.data;
  }

  async update(id: string, plano: Partial<Omit<AlunoModel, 'id'>>): Promise<AlunoModel> {
    const response = await api.put(`/alunos/${id}`, plano);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/alunos/${id}`);
  }
}

export default new AlunosService();
