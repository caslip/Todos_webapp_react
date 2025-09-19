import React, { useState } from 'react';
import { CreateTodo } from '../types/todo';
import apiService from '../services/api';

interface TodoFormProps {
  onAdd: (todo: any) => void;
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
}

/**
 * 添加待办事项表单组件
 */
const TodoForm: React.FC<TodoFormProps> = ({ onAdd, onError, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 处理表单提交
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证输入
    if (!title.trim()) {
      onError('请输入待办事项标题');
      return;
    }

    if (title.trim().length > 200) {
      onError('标题长度不能超过200个字符');
      return;
    }

    setIsLoading(true);
    try {
      // 创建新的待办事项
      const newTodo: CreateTodo = {
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
      };

      const createdTodo = await apiService.createTodo(newTodo);
      
      // 通知父组件
      onAdd(createdTodo);
      
      // 清空表单
      setTitle('');
      setDescription('');
      
      // 显示成功消息
      onSuccess('待办事项添加成功！');
    } catch (error) {
      console.error('添加待办事项失败:', error);
      onError('添加待办事项失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 处理输入变化
   */
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  /**
   * 处理描述变化
   */
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  /**
   * 处理键盘事件（按Enter提交）
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onKeyPress={handleKeyPress}
            placeholder="输入新的待办事项..."
            className="todo-input"
            disabled={isLoading}
            maxLength={200}
          />
          <button
            type="submit"
            className="add-button"
            disabled={isLoading || !title.trim()}
          >
            {isLoading ? '添加中...' : '添加'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
