import React, { JSX } from 'react';
import apiService from '../services/api';

interface ActionButtonsProps {
  hasCompletedTodos: boolean;
  hasTodos: boolean;
  onRefresh: () => void;
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
}

/**
 * 批量操作按钮组件
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  hasCompletedTodos, 
  hasTodos, 
  onRefresh, 
  onError, 
  onSuccess 
}) => {
  /**
   * 清除已完成的待办事项
   */
  const handleClearCompleted = async () => {
    if (!hasCompletedTodos) {
      onError('没有已完成的待办事项');
      return;
    }

    if (!window.confirm('确定要删除所有已完成的待办事项吗？')) {
      return;
    }

    try {
      await apiService.deleteCompletedTodos();
      onSuccess('所有已完成的待办事项已删除！');
      onRefresh();
    } catch (error) {
      console.error('删除已完成待办事项失败:', error);
      onError('删除失败，请稍后重试');
    }
  };

  /**
   * 清除所有待办事项
   */
  const handleClearAll = async () => {
    if (!hasTodos) {
      onError('没有待办事项');
      return;
    }

    if (!window.confirm('确定要删除所有待办事项吗？此操作不可恢复！')) {
      return;
    }

    try {
      await apiService.deleteAllTodos();
      onSuccess('所有待办事项已删除！');
      onRefresh();
    } catch (error) {
      console.error('删除所有待办事项失败:', error);
      onError('删除失败，请稍后重试');
    }
  };

  return (
    <div className="action-buttons">
      <button
        onClick={handleClearCompleted}
        className="clear-button"
        disabled={!hasCompletedTodos}
        title={hasCompletedTodos ? '删除所有已完成的待办事项' : '没有已完成的待办事项'}
      >
        清除已完成
      </button>
      <button
        onClick={handleClearAll}
        className="clear-button danger"
        disabled={!hasTodos}
        title={hasTodos ? '删除所有待办事项' : '没有待办事项'}
      >
        清除全部
      </button>
    </div>
  );
};

export default ActionButtons;
