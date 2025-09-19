import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Todo, FilterType } from '../types/todo';
import apiService from '../services/api';
import TodoItem from './TodoItem';

interface TodoListProps {
  currentFilter: FilterType;
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
  refreshTrigger?: number;
}

interface TodoListRef {
  handleAddTodo: (todo: Todo) => void;
}

/**
 * 待办事项列表组件
 */
const TodoList = forwardRef<TodoListRef, TodoListProps>(({ currentFilter, onError, onSuccess, refreshTrigger = 0 }, ref) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    handleAddTodo: (todo: Todo) => {
      // 直接添加到列表顶部，无需重新获取
      setTodos(prevTodos => [todo, ...prevTodos]);
      onSuccess('待办事项添加成功！');
    }
  }));

  /**
   * 获取待办事项列表
   */
  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTodos = await apiService.getTodos(currentFilter);
      setTodos(fetchedTodos);
    } catch (err) {
      console.error('获取待办事项失败:', err);
      setError('获取待办事项失败，请稍后重试');
      onError('获取待办事项失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 当筛选条件或刷新触发器变化时重新获取数据
   */
  useEffect(() => {
    fetchTodos();
  }, [currentFilter, refreshTrigger]);

  /**
   * 添加新的待办事项
   */
  const handleAddTodo = (newTodo: Todo) => {
    // 直接添加到列表顶部，无需重新获取
    setTodos(prevTodos => [newTodo, ...prevTodos]);
    onSuccess('待办事项添加成功！');
  };

  /**
   * 更新待办事项
   */
  const handleUpdateTodo = (updatedTodo: Todo) => {
    // 直接更新列表中的项目，无需重新获取
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  /**
   * 删除待办事项
   */
  const handleDeleteTodo = (id: number) => {
    // 直接从列表中移除，无需重新获取
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    onSuccess('待办事项删除成功！');
  };

  /**
   * 刷新列表
   */
  const handleRefresh = () => {
    fetchTodos();
  };

  /**
   * 计算统计数据
   */
  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <div className="error-title">错误</div>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {/* 统计信息 */}
      <div className="todo-stats">
        <span>总计: {stats.total}</span>
        <span>未完成: {stats.active}</span>
        <span>已完成: {stats.completed}</span>
      </div>

      {/* 待办事项列表 */}
      {todos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-text">
            {currentFilter === 'all' && '暂无待办事项'}
            {currentFilter === 'active' && '没有未完成的待办事项'}
            {currentFilter === 'completed' && '没有已完成的待办事项'}
          </div>
          <div className="empty-state-subtext">
            {currentFilter === 'all' && '添加一个新的待办事项开始吧！'}
            {currentFilter === 'active' && '完成一些任务后它们会显示在这里'}
            {currentFilter === 'completed' && '完成任务后它们会显示在这里'}
          </div>
        </div>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
            onError={onError}
            onSuccess={onSuccess}
            refreshTrigger={refreshTrigger}
          />
        ))
      )}
    </div>
  );
});

export default TodoList;
