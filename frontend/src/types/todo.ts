/**
 * 待办事项接口定义
 */
export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at?: string;
}

/**
 * 创建待办事项的接口定义
 */
export interface CreateTodo {
  title: string;
  description?: string;
  completed?: boolean;
}

/**
 * 更新待办事项的接口定义
 */
export interface UpdateTodo {
  title?: string;
  description?: string;
  completed?: boolean;
}

/**
 * 筛选条件类型
 */
export type FilterType = 'all' | 'active' | 'completed';

/**
 * API响应接口
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

/**
 * 待办事项列表响应接口
 */
export interface TodoListResponse {
  todos: Todo[];
  total: number;
}
