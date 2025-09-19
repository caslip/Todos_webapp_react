import React, { useState, useEffect, useRef } from 'react';
import { FilterType, Todo, CreateTodo } from './types/todo';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import ActionButtons from './components/ActionButtons';
import './styles/App.css';

/**
 * 主应用组件
 */
const App: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const todoListRef = useRef<any>(null);

  /**
   * 处理错误消息
   */
  const handleError = (error: string) => {
    setMessage({ type: 'error', text: error });
    // 5秒后自动清除错误消息
    setTimeout(() => setMessage(null), 5000);
  };

  /**
   * 处理成功消息
   */
  const handleSuccess = (success: string) => {
    setMessage({ type: 'success', text: success });
    // 3秒后自动清除成功消息
    setTimeout(() => setMessage(null), 3000);
  };

  /**
   * 刷新待办事项列表
   */
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  /**
   * 处理添加待办事项
   */
  const handleAddTodo = (todo: CreateTodo) => {
    // 触发刷新
    setRefreshTrigger(prev => prev + 1);
  };

  /**
   * 处理添加待办事项到列表
   */
  const handleAddTodoToList = (todo: Todo) => {
    if (todoListRef.current && typeof todoListRef.current.handleAddTodo === 'function') {
      todoListRef.current.handleAddTodo(todo);
    }
  };

  /**
   * 计算统计数据
   */
  const getStats = () => {
    // 这个统计信息会在TodoList组件中计算，这里只是传递给ActionButtons
    return { hasCompletedTodos: true, hasTodos: true };
  };

  const stats = getStats();

  return (
    <div className="app-container">
      <h1 className="app-title">待办事项管理</h1>
      
      {/* 消息提示 */}
      {message && (
        <div className={message.type}>
          <div className={`${message.type}-title`}>
            {message.type === 'error' ? '错误' : '成功'}
          </div>
          <div className={`${message.type}-message`}>{message.text}</div>
        </div>
      )}

      {/* 添加待办事项表单 */}
      <TodoForm
        onAdd={(todo) => {
          // 调用 TodoList 的 onAdd 方法
          if (todoListRef.current && typeof todoListRef.current.handleAddTodo === 'function') {
            todoListRef.current.handleAddTodo(todo);
          }
          // 同时触发刷新
          setRefreshTrigger(prev => prev + 1);
        }}
        onError={handleError}
        onSuccess={handleSuccess}
      />

      {/* 筛选按钮 */}
      <FilterButtons
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />

      {/* 待办事项列表 */}
      <TodoList
        ref={todoListRef}
        currentFilter={currentFilter}
        onError={handleError}
        onSuccess={handleSuccess}
        refreshTrigger={refreshTrigger}
      />

      {/* 批量操作按钮 */}
      <ActionButtons
        hasCompletedTodos={stats.hasCompletedTodos}
        hasTodos={stats.hasTodos}
        onRefresh={handleRefresh}
        onError={handleError}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default App;
