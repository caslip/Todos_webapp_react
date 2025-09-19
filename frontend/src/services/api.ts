import axios, { AxiosInstance } from 'axios';
import { Todo, CreateTodo, UpdateTodo, FilterType, TodoListResponse } from '../types/todo';

/**
 * API服务类
 * 负责与后端API进行通信
 */
class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8000/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10秒超时
    });
  }

  /**
   * 获取待办事项列表
   * @param filter 筛选条件
   * @returns 待办事项列表
   */
  async getTodos(filter: FilterType = 'all'): Promise<Todo[]> {
    try {
      const response = await this.api.get<Todo[]>('/todos', {
        params: { filter },
      });
      return response.data;
    } catch (error) {
      console.error('获取待办事项列表失败:', error);
      throw error;
    }
  }

  /**
   * 根据ID获取单个待办事项
   * @param id 待办事项ID
   * @returns 待办事项详情
   */
  async getTodoById(id: number): Promise<Todo> {
    try {
      const response = await this.api.get<Todo>(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`获取待办事项失败 (ID: ${id}):`, error);
      throw error;
    }
  }

  /**
   * 创建新的待办事项
   * @param todoData 待办事项数据
   * @returns 创建的待办事项
   */
  async createTodo(todoData: CreateTodo): Promise<Todo> {
    try {
      const response = await this.api.post<Todo>('/todos', todoData);
      return response.data;
    } catch (error) {
      console.error('创建待办事项失败:', error);
      throw error;
    }
  }

  /**
   * 更新待办事项
   * @param id 待办事项ID
   * @param todoData 更新的数据
   * @returns 更新后的待办事项
   */
  async updateTodo(id: number, todoData: UpdateTodo): Promise<Todo> {
    try {
      const response = await this.api.put<Todo>(`/todos/${id}`, todoData);
      return response.data;
    } catch (error) {
      console.error(`更新待办事项失败 (ID: ${id}):`, error);
      throw error;
    }
  }

  /**
   * 标记待办事项为完成
   * @param id 待办事项ID
   * @returns 更新后的待办事项
   */
  async completeTodo(id: number): Promise<Todo> {
    try {
      const response = await this.api.put<Todo>(`/todos/${id}/complete`);
      return response.data;
    } catch (error) {
      console.error(`标记待办事项完成失败 (ID: ${id}):`, error);
      throw error;
    }
  }

  /**
   * 标记待办事项为未完成
   * @param id 待办事项ID
   * @returns 更新后的待办事项
   */
  async uncompleteTodo(id: number): Promise<Todo> {
    try {
      const response = await this.api.put<Todo>(`/todos/${id}/uncomplete`);
      return response.data;
    } catch (error) {
      console.error(`标记待办事项未完成失败 (ID: ${id}):`, error);
      throw error;
    }
  }

  /**
   * 删除待办事项
   * @param id 待办事项ID
   * @returns 删除成功消息
   */
  async deleteTodo(id: number): Promise<{ message: string }> {
    try {
      const response = await this.api.delete<{ message: string }>(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`删除待办事项失败 (ID: ${id}):`, error);
      throw error;
    }
  }

  /**
   * 删除所有已完成的待办事项
   * @returns 删除成功消息
   */
  async deleteCompletedTodos(): Promise<{ message: string }> {
    try {
      const response = await this.api.delete<{ message: string }>('/todos/completed');
      return response.data;
    } catch (error) {
      console.error('删除已完成待办事项失败:', error);
      throw error;
    }
  }

  /**
   * 删除所有待办事项
   * @returns 删除成功消息
   */
  async deleteAllTodos(): Promise<{ message: string }> {
    try {
      const response = await this.api.delete<{ message: string }>('/todos');
      return response.data;
    } catch (error) {
      console.error('删除所有待办事项失败:', error);
      throw error;
    }
  }
}

// 创建API服务实例
export const apiService = new ApiService();
export default apiService;
