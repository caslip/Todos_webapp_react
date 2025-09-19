import React, { useState } from 'react';
import { Todo, UpdateTodo } from '../types/todo';
import apiService from '../services/api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
  refreshTrigger?: number;
}

/**
 * 单个待办事项组件
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete, onError, onSuccess, refreshTrigger = 0 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 标记为完成
   */
  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const updatedTodo = await apiService.completeTodo(todo.id);
      onUpdate(updatedTodo);
      onSuccess('任务已标记为完成！');
    } catch (error) {
      console.error('标记完成失败:', error);
      onError('标记完成失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 标记为未完成
   */
  const handleUncomplete = async () => {
    setIsLoading(true);
    try {
      const updatedTodo = await apiService.uncompleteTodo(todo.id);
      onUpdate(updatedTodo);
      onSuccess('任务已标记为未完成！');
    } catch (error) {
      console.error('标记未完成失败:', error);
      onError('标记未完成失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 删除待办事项
   */
  const handleDelete = async () => {
    if (!window.confirm('确定要删除这个待办事项吗？')) {
      return;
    }

    setIsLoading(true);
    try {
      await apiService.deleteTodo(todo.id);
      onDelete(todo.id);
      onSuccess('待办事项已删除！');
    } catch (error) {
      console.error('删除失败:', error);
      onError('删除失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 开始编辑
   */
  const startEditing = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  /**
   * 取消编辑
   */
  const cancelEditing = () => {
    setIsEditing(false);
  };

  /**
   * 保存编辑
   */
  const saveEdit = async () => {
    if (!editTitle.trim()) {
      onError('标题不能为空');
      return;
    }

    if (editTitle.trim() === todo.title && editDescription === (todo.description || '')) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      const updateData: UpdateTodo = {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      };

      const updatedTodo = await apiService.updateTodo(todo.id, updateData);
      onUpdate(updatedTodo);
      setIsEditing(false);
      onSuccess('待办事项已更新！');
    } catch (error) {
      console.error('更新失败:', error);
      onError('更新失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 处理标题变化
   */
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  /**
   * 处理描述变化
   */
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDescription(e.target.value);
  };

  /**
   * 处理键盘事件
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="todo-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={handleTitleChange}
            onKeyPress={handleKeyPress}
            className="todo-input"
            placeholder="任务标题"
            autoFocus
            maxLength={200}
          />
          <input
            type="text"
            value={editDescription}
            onChange={handleDescriptionChange}
            onKeyPress={handleKeyPress}
            className="todo-input"
            placeholder="任务描述（可选）"
            maxLength={500}
          />
          <div className="todo-actions">
            <button
              onClick={saveEdit}
              className="todo-button complete-button"
              disabled={isLoading || !editTitle.trim()}
            >
              {isLoading ? '保存中...' : '保存'}
            </button>
            <button
              onClick={cancelEditing}
              className="todo-button delete-button"
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-text">
            <div className="todo-title">{todo.title}</div>
            {todo.description && (
              <div className="todo-description">{todo.description}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.completed ? (
              <button
                onClick={handleUncomplete}
                className="todo-button uncomplete-button"
                disabled={isLoading}
              >
                {isLoading ? '操作中...' : '标记未完成'}
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="todo-button complete-button"
                disabled={isLoading}
              >
                {isLoading ? '操作中...' : '标记完成'}
              </button>
            )}
            <button
              onClick={startEditing}
              className="todo-button"
              style={{ backgroundColor: '#3498db', color: 'white' }}
              disabled={isLoading}
            >
              编辑
            </button>
            <button
              onClick={handleDelete}
              className="todo-button delete-button"
              disabled={isLoading}
            >
              {isLoading ? '删除中...' : '删除'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
