import axiosClient from '../../../api/axiosClient';
import type { Todo } from '../types/Todo.types';

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const response = await axiosClient.get<Todo[]>('');
    return response.data;
  },

  getById: async (id: string): Promise<Todo> => {
    const response = await axiosClient.get<Todo>(`/${id}`);
    return response.data;
  },

  create: async (todo: Todo): Promise<Todo> => {
    const response = await axiosClient.post<Todo>('', todo);
    return response.data;
  },

  update: async (id: string, todo: Todo): Promise<Todo> => {
    const response = await axiosClient.put<Todo>(`/${id}`, todo);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`/${id}`);
  },
};
